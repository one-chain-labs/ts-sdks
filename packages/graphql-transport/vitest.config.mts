// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		minWorkers: 1,
		maxWorkers: 4,
		hookTimeout: 1000000,
		testTimeout: 1000000,
		env: {
			NODE_ENV: 'test',
		},
		setupFiles: ['test/setupEnv.ts'],
		globalSetup: ['test/globalSetup.ts'],
	},
	resolve: {
		alias: {
			'@onelabs/bcs': new URL('../bcs/src', import.meta.url).pathname,
			'@onelabs/sui/transactions': new URL('../typescript/src/transactions', import.meta.url)
				.pathname,
			'@onelabs/sui': new URL('../typescript/src', import.meta.url).pathname,
		},
	},
});
