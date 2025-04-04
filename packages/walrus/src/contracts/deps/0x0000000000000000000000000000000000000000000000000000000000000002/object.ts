// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

export function ID() {
	return bcs.struct('ID', {
		bytes: bcs.Address,
	});
}
export function UID() {
	return bcs.struct('UID', {
		id: bcs.Address,
	});
}
