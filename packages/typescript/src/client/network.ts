// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export function getFullnodeUrl(network: 'mainnet' | 'testnet' | 'devnet' | 'localnet') {
	switch (network) {
		case 'mainnet':
			return 'https://rpc.onelabs.cc:443';
		case 'testnet':
			return 'https://rpc-testnet.onelabs.cc:443';
		case 'devnet':
			return 'https://rpc-devnet.onelabs.cc:443';
		case 'localnet':
			return 'http://127.0.0.1:9000';
		default:
			throw new Error(`Unknown network: ${network}`);
	}
}
