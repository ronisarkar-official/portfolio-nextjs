'use client';

import dynamic from 'next/dynamic';

const EasterEgg = dynamic(() => import('@/components/EasterEgg'), {
	ssr: false,
});
const CommandMenu = dynamic(() => import('@/components/CommandMenu'), {
	ssr: false,
});

/**
 * Wrapper for interactive-only components that don't need SSR.
 * These are lazily loaded on the client to reduce the initial JS bundle.
 */
export default function ClientShell() {
	return (
		<>
			<EasterEgg />
			<CommandMenu />
		</>
	);
}
