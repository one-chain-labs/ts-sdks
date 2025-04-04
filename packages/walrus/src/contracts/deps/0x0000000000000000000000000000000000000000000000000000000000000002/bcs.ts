// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

export function BCS() {
	return bcs.struct('BCS', {
		bytes: bcs.vector(bcs.u8()),
	});
}
