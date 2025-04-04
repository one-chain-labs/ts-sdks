// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

export function SUI() {
	return bcs.struct('SUI', {
		dummy_field: bcs.bool(),
	});
}
