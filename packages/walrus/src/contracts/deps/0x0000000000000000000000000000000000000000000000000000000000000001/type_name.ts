// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

export function TypeName() {
	return bcs.struct('TypeName', {
		name: bcs.string(),
	});
}
