// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';
import type { BcsType } from '@onelabs/sui/bcs';

export function PriorityQueue<T0 extends BcsType<any>>(...typeParameters: [T0]) {
	return bcs.struct('PriorityQueue', {
		entries: bcs.vector(Entry(typeParameters[0])),
	});
}
export function Entry<T0 extends BcsType<any>>(...typeParameters: [T0]) {
	return bcs.struct('Entry', {
		priority: bcs.u64(),
		value: typeParameters[0],
	});
}
