// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

export function String() {
	return bcs.struct('String', {
		bytes: bcs.vector(bcs.u8()),
	});
}
