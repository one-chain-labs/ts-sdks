// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';
import type { BcsType } from '@onelabs/sui/bcs';

export function Referent<T0 extends BcsType<any>>(...typeParameters: [T0]) {
	return bcs.struct('Referent', {
		id: bcs.Address,
		value: bcs.option(typeParameters[0]),
	});
}
export function Borrow() {
	return bcs.struct('Borrow', {
		ref: bcs.Address,
		obj: bcs.Address,
	});
}
