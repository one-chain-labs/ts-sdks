// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import type { SuiClient } from '@onelabs/sui/client';
import type { TransactionObjectArgument, TransactionObjectInput } from '@onelabs/sui/transactions';

// Interfaces
// -----------------

export interface CoinConfig {
	type: string;
	feed: string;
}

export interface DiscountInfo {
	discountNft: TransactionObjectInput;
	type: string;
	isFreeClaim?: boolean;
}

export interface PackageInfo {
	packageId: string;
	packageIdV1: string;
	packageIdPricing: string;
	suins: string;
	discountsPackage: {
		packageId: string;
		discountHouseId: string;
	};
	subNamesPackageId: string;
	tempSubdomainsProxyPackageId: string;
	coupons: {
		packageId: string;
	};
	payments: {
		packageId: string;
	};
	registryTableId?: string;
	pyth: {
		pythStateId: string;
		wormholeStateId: string;
	};
	utils?: {
		packageId: string;
	};
	coins: Record<string, CoinConfig>;
}

export interface NameRecord {
	name: string;
	nftId: string;
	targetAddress: string;
	expirationTimestampMs: number;
	data: Record<string, string>;
	avatar?: string;
	contentHash?: string;
	walrusSiteId?: string;
}

// Types
// -----------------

export type Network = 'mainnet' | 'testnet' | 'custom';

export type VersionedPackageId = {
	latest: string;
	v1: string;
	[key: string]: string;
};

export type Config = Record<'mainnet' | 'testnet', PackageInfo>;

export type BaseParams = {
	years: number;
	coinConfig: CoinConfig;
	coin?: TransactionObjectInput;
	couponCode?: string;
	discountInfo?: DiscountInfo;
	maxAmount?: bigint;
	priceInfoObjectId?: string | null;
};

export type RegistrationParams = BaseParams & {
	domain: string;
};

export type RenewalParams = BaseParams & {
	nft: TransactionObjectInput;
};

export type ReceiptParams = {
	paymentIntent: TransactionObjectArgument;
	priceAfterDiscount: TransactionObjectArgument;
	coinConfig: CoinConfig;
	coin?: TransactionObjectInput;
	maxAmount?: bigint;
	priceInfoObjectId?: string | null;
};

export type SuinsClientConfig = {
	client: SuiClient;
	network?: Network;
	config?: Config;
};

export type SuinsPriceList = Map<[number, number], number>;

export type CoinTypeDiscount = Map<string, number>;
