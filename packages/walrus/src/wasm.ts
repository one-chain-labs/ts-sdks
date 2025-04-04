// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromBase64 } from '@onelabs/bcs';
import init, {
	BlobEncoder,
	bls12381_min_pk_aggregate,
	bls12381_min_pk_verify,
} from '@onelabs/walrus-wasm';

import type { StorageConfirmation } from './storage-node/types.js';
import type { EncodingType } from './types.js';
import type { BlobMetadata, BlobMetadataWithId, SliverData, SliverPair } from './utils/bcs.js';
import { BlobId, blobIdFromBytes } from './utils/bcs.js';

export interface EncodedBlob {
	sliverPairs: (typeof SliverPair.$inferInput)[];
	blobId: string;
	metadata: typeof BlobMetadata.$inferInput;
	rootHash: Uint8Array;
}

export async function encodeBlob(
	nShards: number,
	bytes: Uint8Array,
	encodingType: EncodingType = 'RS2',
): Promise<EncodedBlob> {
	await init();

	const encoder = new BlobEncoder(nShards);

	if (encodingType !== 'RS2') {
		throw new Error(`Unsupported encoding type: ${encodingType}`);
	}

	const [sliverPairs, metadata, rootHash] = encoder.encode_with_metadata(bytes);

	return {
		sliverPairs,
		blobId: blobIdFromBytes(new Uint8Array(metadata.blob_id)),
		metadata: metadata.metadata,
		rootHash: new Uint8Array(rootHash.Digest),
	};
}

export interface CombinedSignature {
	signers: number[];
	serializedMessage: Uint8Array;
	signature: Uint8Array;
}

export async function combineSignatures(
	confirmations: StorageConfirmation[],
	signerIndices: number[],
): Promise<CombinedSignature> {
	await init();

	const signature = bls12381_min_pk_aggregate(
		confirmations.map((confirmation) => fromBase64(confirmation.signature)),
	);

	return {
		signers: signerIndices,
		serializedMessage: fromBase64(confirmations[0].serializedMessage),
		signature,
	};
}

export function decodePrimarySlivers(
	blobId: string,
	nShards: number,
	size: number | bigint | string,
	slivers: (typeof SliverData.$inferInput)[],
	encodingType: EncodingType = 'RS2',
): Uint8Array {
	const encoder = new BlobEncoder(nShards);

	if (encodingType !== 'RS2') {
		throw new Error(`Unsupported encoding type: ${encodingType}`);
	}

	const [bytes] = encoder.decode(
		BlobId.serialize(blobId).toBytes(),
		BigInt(size),
		slivers.map((sliver) => ({
			...sliver,
			_sliver_type: undefined,
		})),
	);

	return new Uint8Array(bytes);
}

export async function getVerifySignature() {
	await init();
	return (confirmation: StorageConfirmation, publicKey: Uint8Array) =>
		bls12381_min_pk_verify(
			fromBase64(confirmation.signature),
			publicKey,
			fromBase64(confirmation.serializedMessage),
		);
}

export function computeMetadata(
	nShards: number,
	bytes: Uint8Array,
	encodingType: EncodingType = 'RS2',
): typeof BlobMetadataWithId.$inferInput & { blob_id: string } {
	const encoder = new BlobEncoder(nShards);
	const metadata = encoder.compute_metadata(bytes);

	if (encodingType !== 'RS2') {
		throw new Error(`Unsupported encoding type: ${encodingType}`);
	}

	return {
		...metadata,
		blob_id: blobIdFromBytes(new Uint8Array(metadata.blob_id)),
	};
}
