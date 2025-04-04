// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';
import type { Transaction } from '@onelabs/sui/transactions';

import * as object from './deps/0x0000000000000000000000000000000000000000000000000000000000000002/object.js';
import * as _package from './deps/0x0000000000000000000000000000000000000000000000000000000000000002/package.js';
import { normalizeMoveArguments } from './utils/index.js';
import type { RawTransactionArgument } from './utils/index.js';

export function INIT() {
	return bcs.struct('INIT', {
		dummy_field: bcs.bool(),
	});
}
export function InitCap() {
	return bcs.struct('InitCap', {
		id: object.UID(),
		publisher: _package.Publisher(),
	});
}
export function init(packageAddress: string) {
	function init(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddress}::init::INIT`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'init',
				function: 'init',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function initialize_walrus(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::init::InitCap`,
			'0x0000000000000000000000000000000000000000000000000000000000000002::package::UpgradeCap',
			'u64',
			'u64',
			'u16',
			'u32',
			'0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'init',
				function: 'initialize_walrus',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function migrate(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::staking::Staking`,
			`${packageAddress}::system::System`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'init',
				function: 'migrate',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { init, initialize_walrus, migrate };
}
