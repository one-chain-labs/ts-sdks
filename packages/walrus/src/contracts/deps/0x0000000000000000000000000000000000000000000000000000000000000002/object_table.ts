// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

import * as object from './object.js';

export function ObjectTable() {
	return bcs.struct('ObjectTable', {
		id: object.UID(),
		size: bcs.u64(),
	});
}
