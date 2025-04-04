// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@onelabs/sui/bcs';

export function TxContext() {
	return bcs.struct('TxContext', {
		sender: bcs.Address,
		tx_hash: bcs.vector(bcs.u8()),
		epoch: bcs.u64(),
		epoch_timestamp_ms: bcs.u64(),
		ids_created: bcs.u64(),
	});
}
