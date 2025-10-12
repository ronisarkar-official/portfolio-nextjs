'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

type BackToTopProps = {
	/** Number of pixels user must scroll before button shows (default: 300) */
	showAfter?: number;
	/** Button size in px (default: 44) */
	size?: number;
	/** Additional classes for the button */
	className?: string;
	/** Label for accessibility */
	ariaLabel?: string;
};

export default function BackToTop({
	showAfter = 300,
	size = 44,
	className = '',
	ariaLabel = 'Back to top',
}: BackToTopProps) {
	const [visible, setVisible] = useState(false);
	const mountedRef = useRef(false);
	const ticking = useRef(false);

	useEffect(() => {
		// avoid hydration mismatch
		mountedRef.current = true;

		// Respect users that prefer reduced motion
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		const onScroll = () => {
			if (ticking.current) return;
			ticking.current = true;
			requestAnimationFrame(() => {
				const y = window.scrollY || window.pageYOffset;
				setVisible(y > showAfter);
				ticking.current = false;
			});
		};

		// Initial check in case the page loads scrolled
		onScroll();

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [showAfter]);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		// Respect reduced motion: if user prefers reduced motion, jump to top
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		if ('scrollBehavior' in document.documentElement.style && !reducedMotion) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			window.scrollTo(0, 0);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			(e.target as HTMLElement).click();
		}
	};

	// Do not render on server
	if (!mountedRef.current) return null;

	return (
		<div
			aria-hidden={!visible}
			// keep DOM node for layout stability — we control visibility via opacity/transform
			className={`pointer-events-none fixed bottom-6 right-6 z-50 ${className}`}>
			<button
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				aria-label={ariaLabel}
				title={ariaLabel}
				// allow keyboard and pointer when visible
				tabIndex={visible ? 0 : -1}
				// Button styles — Tailwind (supports dark/light)
				style={{
					width: size,
					height: size,
				}}
				className={`pointer-events-auto flex items-center justify-center rounded-full shadow-lg transition-transform transition-opacity duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 focus-visible:ring-indigo-500
          ${
						visible ?
							'opacity-100 translate-y-0 scale-100'
						:	'opacity-0 translate-y-4 scale-95'
					}
          bg-white/90 dark:bg-neutral-900/90 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm
        `}>
				{/* Icon from lucide-react. Accessible fallback text for screen readers is in aria-label */}
				<ArrowUp
					size={size * 0.5}
					aria-hidden="true"
				/>
			</button>
		</div>
	);
}

