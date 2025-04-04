// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';
import type { Transaction } from '@onelabs/sui/transactions';

import * as vec_map from './deps/0x0000000000000000000000000000000000000000000000000000000000000002/vec_map.js';
import { normalizeMoveArguments } from './utils/index.js';
import type { RawTransactionArgument } from './utils/index.js';

export function Metadata() {
	return bcs.struct('Metadata', {
		metadata: vec_map.VecMap(bcs.string(), bcs.string()),
	});
}
export function init(packageAddress: string) {
	function _new(options: { arguments: [] }) {
		const argumentsTypes: string[] = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'metadata',
				function: 'new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function insert_or_update(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddress}::metadata::Metadata`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'metadata',
				function: 'insert_or_update',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function remove(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::metadata::Metadata`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'metadata',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function remove_if_exists(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddress}::metadata::Metadata`,
			'0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'metadata',
				function: 'remove_if_exists',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { _new, insert_or_update, remove, remove_if_exists };
}
