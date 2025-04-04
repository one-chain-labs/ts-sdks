// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';
import type { BcsType } from '@onelabs/sui/bcs';

export function Wrapper<T0 extends BcsType<any>>(...typeParameters: [T0]) {
	return bcs.struct('Wrapper', {
		name: typeParameters[0],
	});
}
