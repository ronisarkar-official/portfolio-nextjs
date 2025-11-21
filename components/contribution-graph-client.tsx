'use client';

import { useRef } from 'react';
import './contribution-graph.css';

interface Props {
	children: React.ReactNode;
}

/**
 * Minimal client wrapper for contribution graph tooltip interactivity.
 * Uses event delegation for optimal performance.
 */
export default function ContributionGraphClient({ children }: Props) {
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as SVGElement | null;
		const tooltip = tooltipRef.current;
		const container = containerRef.current;
		if (!tooltip || !container) return;

		if (
			!target ||
			target.tagName.toLowerCase() !== 'rect' ||
			!target.dataset.date
		) {
			tooltip.style.display = 'none';
			return;
		}

		const date = target.dataset.date!;
		const count = Number(target.dataset.count ?? 0);
		const rect = container.getBoundingClientRect();
		const x = e.clientX - rect.left + 8;
		const y = e.clientY - rect.top + 8;

		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y}px`;
		tooltip.style.display = 'block';
		tooltip.textContent = `${date}: ${count} contribution${
			count !== 1 ? 's' : ''
		}`;
	};

	const onMouseLeave = () => {
		const tooltip = tooltipRef.current;
		if (tooltip) tooltip.style.display = 'none';
	};

	return (
		<div
			ref={containerRef}
			style={{ position: 'relative' }}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}>
			{children}
			<div
				ref={tooltipRef}
				className="contribution-tooltip"
			/>
		</div>
	);
}
