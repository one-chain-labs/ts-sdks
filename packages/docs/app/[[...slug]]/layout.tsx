// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DocsLayout
			{...baseOptions}
			tree={source.pageTree}
			sidebar={{
				tabs: [
					{
						title: 'OneChain SDK',
						description: 'TypeScript interfaces for OneChain',
						url: '/typescript',
					},
					{
						title: 'BCS',
						description: 'Encoding and decoding Oct objects',
						url: '/bcs',
					},
					{
						title: 'Dapp Kit',
						description: 'Build OneChain dapps in React',
						url: '/dapp-kit',
					},
					{
						title: 'Kiosk',
						description: 'Interact with on-chain commerce applications',
						url: '/kiosk',
					},
					{
						title: 'Walrus',
						description: 'Publish and Read blobs directly from walrus storage nodes',
						url: '/walrus',
					},
					{
						title: 'zkSend',
						description: 'Send Oct with a link',
						url: '/zksend',
					},
					{
						title: 'wallet',
						description: 'Support zklogin via hone',
						url: '/wallet',
					},
					{
						title: 'API Reference',
						url: '/typedoc/index.html',
					},
				],
			}}
		>
			{children}
		</DocsLayout>
	);
}
