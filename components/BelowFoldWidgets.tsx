'use client';

import dynamic from 'next/dynamic';

const QuoteBlock = dynamic(
	() => import('@/components/QuoteBlock').then((mod) => ({ default: mod.QuoteBlock })),
	{ ssr: false }
);
const VisitorCounter = dynamic(
	() => import('@/components/VisitorCounter'),
	{ ssr: false }
);

/**
 * Below-fold interactive components lazily loaded on client side.
 * Reduces initial JS bundle for the homepage.
 */
export default function BelowFoldWidgets() {
	return (
		<>
			<QuoteBlock />
			<div className="flex justify-center mt-6">
				<VisitorCounter />
			</div>
		</>
	);
}
