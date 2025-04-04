// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

import * as object from './object.js';

export function Table() {
	return bcs.struct('Table', {
		id: object.UID(),
		size: bcs.u64(),
	});
}
