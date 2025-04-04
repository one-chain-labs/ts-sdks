// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { toBase64 } from '@onelabs/bcs';
import { bcs } from '@onelabs/sui/bcs';
import type { Signer } from '@onelabs/sui/cryptography';
import { SuiGraphQLClient } from '@onelabs/sui/graphql';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import { isValidSuiAddress, isValidSuiObjectId } from '@onelabs/sui/utils';
import { verifyPersonalMessageSignature } from '@onelabs/sui/verify';

import { generateSecretKey, toPublicKey, toVerificationKey } from './elgamal.js';
import {
	ExpiredSessionKeyError,
	InvalidPersonalMessageSignatureError,
	UserError,
} from './error.js';

export const RequestFormat = bcs.struct('RequestFormat', {
	ptb: bcs.vector(bcs.U8),
	encKey: bcs.vector(bcs.U8),
	encVerificationKey: bcs.vector(bcs.U8),
});

export type Certificate = {
	user: string;
	session_vk: string;
	creation_time: number;
	ttl_min: number;
	signature: string;
};

export class SessionKey {
	#address: string;
	#packageId: string;
	#creationTimeMs: number;
	#ttlMin: number;
	#sessionKey: Ed25519Keypair;
	#personalMessageSignature?: string;
	#signer?: Signer;

	constructor({
		address,
		packageId,
		ttlMin,
		signer,
	}: {
		address: string;
		packageId: string;
		ttlMin: number;
		signer?: Signer;
	}) {
		if (!isValidSuiObjectId(packageId) || !isValidSuiAddress(address)) {
			throw new UserError(`Invalid package ID ${packageId} or address ${address}`);
		}
		if (ttlMin > 10 || ttlMin < 1) {
			throw new UserError(`Invalid TTL ${ttlMin}, must be between 1 and 10`);
		}

		this.#address = address;
		this.#packageId = packageId;
		this.#creationTimeMs = Date.now();
		this.#ttlMin = ttlMin;
		this.#sessionKey = Ed25519Keypair.generate();
		this.#signer = signer;
	}

	isExpired(): boolean {
		// Allow 10 seconds for clock skew
		return this.#creationTimeMs + this.#ttlMin * 60 * 1000 - 10_000 < Date.now();
	}

	getAddress(): string {
		return this.#address;
	}

	getPackageId(): string {
		return this.#packageId;
	}

	getPersonalMessage(): Uint8Array {
		const creationTimeUtc =
			new Date(this.#creationTimeMs).toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
		const message = `Accessing keys of package ${this.#packageId} for ${this.#ttlMin} mins from ${creationTimeUtc}, session key ${toBase64(this.#sessionKey.getPublicKey().toRawBytes())}`;
		return new TextEncoder().encode(message);
	}

	async setPersonalMessageSignature(personalMessageSignature: string) {
		try {
			// TODO: Fix this to work with any network
			await verifyPersonalMessageSignature(this.getPersonalMessage(), personalMessageSignature, {
				address: this.#address,
				client: new SuiGraphQLClient({
					url: 'https://sui-testnet.mystenlabs.com/graphql',
				}),
			});
			this.#personalMessageSignature = personalMessageSignature;
		} catch (e) {
			throw new InvalidPersonalMessageSignatureError('Not valid');
		}
	}

	async getCertificate(): Promise<Certificate> {
		if (!this.#personalMessageSignature) {
			if (this.#signer) {
				const { signature } = await this.#signer.signPersonalMessage(this.getPersonalMessage());
				this.#personalMessageSignature = signature;
			} else {
				throw new InvalidPersonalMessageSignatureError('Personal message signature is not set');
			}
		}
		return {
			user: this.#address,
			session_vk: toBase64(this.#sessionKey.getPublicKey().toRawBytes()),
			creation_time: this.#creationTimeMs,
			ttl_min: this.#ttlMin,
			signature: this.#personalMessageSignature,
		};
	}

	async createRequestParams(
		txBytes: Uint8Array,
	): Promise<{ decryptionKey: Uint8Array; requestSignature: string }> {
		if (this.isExpired()) {
			throw new ExpiredSessionKeyError();
		}
		const egSk = generateSecretKey();
		const msgToSign = RequestFormat.serialize({
			ptb: txBytes.slice(1),
			encKey: toPublicKey(egSk),
			encVerificationKey: toVerificationKey(egSk),
		}).toBytes();
		return {
			decryptionKey: egSk,
			requestSignature: toBase64(await this.#sessionKey.sign(msgToSign)),
		};
	}
}
