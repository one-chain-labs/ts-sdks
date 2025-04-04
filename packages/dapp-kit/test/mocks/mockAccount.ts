// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import type { WalletAccount } from '@onelabs/wallet-standard';
import { ReadonlyWalletAccount } from '@onelabs/wallet-standard';

export function createMockAccount(accountOverrides: Partial<WalletAccount> = {}) {
	const keypair = new Ed25519Keypair();
	return new ReadonlyWalletAccount({
		address: keypair.getPublicKey().toSuiAddress(),
		publicKey: keypair.getPublicKey().toSuiBytes(),
		chains: ['sui:unknown'],
		features: [
			'sui:signAndExecuteTransactionBlock',
			'sui:signTransactionBlock',
			'sui:signAndExecuteTransaction',
			'sui:signTransaction',
		],
		...accountOverrides,
	});
}
