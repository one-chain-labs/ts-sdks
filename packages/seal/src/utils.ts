// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromHex, toHex } from '@onelabs/bcs';
import { isValidSuiObjectId } from '@onelabs/sui/utils';

import { UserError } from './error.js';

export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
	if (a.length !== b.length) {
		throw new Error('Invalid input');
	}
	return xorUnchecked(a, b);
}

export function xorUnchecked(a: Uint8Array, b: Uint8Array): Uint8Array {
	return a.map((ai, i) => ai ^ b[i]);
}

/**
 * Create a full ID concatenating DST || package ID || inner ID.
 * @param dst - The domain separation tag.
 * @param packageId - The package ID.
 * @param innerId - The inner ID.
 * @returns The full ID.
 */
export function createFullId(dst: Uint8Array, packageId: string, innerId: string): string {
	if (!isValidSuiObjectId(packageId)) {
		throw new UserError(`Invalid package ID ${packageId}`);
	}
	const packageIdBytes = fromHex(packageId);
	const innerIdBytes = fromHex(innerId);
	const fullId = new Uint8Array(1 + dst.length + packageIdBytes.length + innerIdBytes.length);
	fullId.set([dst.length], 0);
	fullId.set(dst, 1);
	fullId.set(packageIdBytes, 1 + dst.length);
	fullId.set(innerIdBytes, 1 + dst.length + packageIdBytes.length);
	return toHex(fullId);
}
