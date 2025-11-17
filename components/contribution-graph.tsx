'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getGitHubContributions, Activity } from '@/lib/github-contributions';

interface Props {
	className?: string;
	squareSize?: number;
	gap?: number;
}
const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
const WEEKS = 50;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function normalizeDateString(dateStr: string) {
	const parts = dateStr.split('-').map(Number);
	if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
		const [y, m, d] = parts;
		return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10);
	}
	try {
		return new Date(dateStr).toISOString().slice(0, 10);
	} catch {
		return dateStr;
	}
}

export default function ContributionGraph({
	className = '',
	squareSize = 13.6,
	gap = 3,
}: Props) {
	const [data, setData] = useState<Activity[] | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const d = await getGitHubContributions();
				if (!mounted) return;
				setData(d);
			} catch (e) {
				console.error(e);
				if (mounted) setData([]);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	// Build weeks grid + month labels in one pass
	const { weeks, width, height, monthLabels } = useMemo(() => {
		if (!data)
			return {
				weeks: null as null | Activity[][],
				width: 0,
				height: 0,
				monthLabels: [] as string[],
			};

		const map = new Map<string, Activity>();
		for (const item of data)
			map.set(normalizeDateString(item.date), {
				...item,
				date: normalizeDateString(item.date),
			});

		// compute start timestamp aligned to Sunday, ensuring the last column
		// always covers the current week (even if the week is incomplete)
		const today = new Date();
		const todayTs = Date.UTC(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
		const endDay = new Date(todayTs).getUTCDay();
		const endTs = todayTs + (6 - endDay) * MS_PER_DAY;
		const startTs = endTs - (WEEKS * 7 - 1) * MS_PER_DAY;

		const weeks: Activity[][] = Array.from(
			{ length: WEEKS },
			() => new Array(7),
		);
		const monthLabels = new Array(WEEKS).fill('');
		const shown = new Set<number>();

		for (let i = 0; i < WEEKS * 7; i++) {
			const wk = Math.floor(i / 7),
				dow = i % 7;
			const ts = startTs + i * MS_PER_DAY;
			const iso = new Date(ts).toISOString().slice(0, 10);
			const contrib = map.get(iso) ?? { date: iso, count: 0, level: 0 };
			weeks[wk][dow] = contrib;

			// Detect first-of-month and set label for this week if not already shown
			const d = new Date(ts);
			const dayOfMonth = d.getUTCDate();
			const month = d.getUTCMonth();
			if (ts <= todayTs && dayOfMonth === 1 && !shown.has(month)) {
				monthLabels[wk] = MONTHS[month];
				shown.add(month);
			}
		}

		const width = WEEKS * (squareSize + gap);
		const height = 7 * (squareSize + gap);
		return { weeks, width, height, monthLabels };
	}, [data, squareSize, gap]);

	// Delegated mouse handling (single listener)
	const onSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
		const target = e.target as SVGElement | null;
		const tooltip = tooltipRef.current;
		const svg = svgRef.current;
		if (!tooltip || !svg) return;
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
		const rect = svg.getBoundingClientRect();
		const x = e.clientX - rect.left + 8;
		const y = e.clientY - rect.top + 8;
		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y}px`;
		tooltip.style.display = 'block';
		tooltip.textContent = `${date}: ${count} contribution${
			count !== 1 ? 's' : ''
		}`;
	};

	const onSvgMouseLeave = () => {
		const tooltip = tooltipRef.current;
		if (tooltip) tooltip.style.display = 'none';
	};

	if (!weeks) return <div className={`h-32 ${className}`}>Loading...</div>;

	return (
		<div
			className={`relative overflow-x-auto md:overflow-x-visible max-w-full ${className}`}
			style={{ width: width + 'px' }}>
			{/* Inline CSS variables for colors (light + dark). Put this in your global CSS if preferred. */}
			<style>{`
:root{
  --contrib-0: #ebedf0;
  --contrib-1: #9be9a8;
  --contrib-2: #30c463;
  --contrib-3: #30a14e;
  --contrib-4: #216e39;
  --contrib-stroke: #e6e6e6;
  --tooltip-bg: rgba(17,17,17,0.95);
  --tooltip-color: #fff;
}
.dark{
  --contrib-0: #161b22;
  --contrib-1: #0e4429;
  --contrib-2: #006d32;
  --contrib-3: #26a641;
  --contrib-4: #39d353;
  --contrib-stroke: transparent;
  --tooltip-bg: rgba(255,255,255,0.06);
  --tooltip-color: #fff;
}
`}</style>

			{/* month labels row */}
			<div
				className="flex mb-1 text-xs text-muted-foreground flex-row ml-6 md:ml-6"
				style={{ marginBottom: 6 }}>
				<div style={{ width: squareSize }} />
				{/* spacer for weekday column */}
				{monthLabels.map((m, i) => (
					<div
						key={i}
						style={{ width: squareSize, marginRight: gap, textAlign: 'center' }}
						aria-hidden
						className="text-center flex-shrink-0">
						{m || ''}
					</div>
				))}
			</div>

			<div style={{ display: 'flex' }}>
				{/* svg grid with delegated tooltip */}
				<div style={{ position: 'relative' }}>
					<svg
						ref={svgRef}
						width={width}
						height={height}
						role="img"
						aria-label="Contribution graph"
						onMouseMove={onSvgMouseMove}
						onMouseLeave={onSvgMouseLeave}>
						{weeks.map((week, wi) =>
							week.map((cell, di) => {
								const x = wi * (squareSize + gap);
								const y = di * (squareSize + gap);
								// use CSS variables so theme switching is handled by CSS only
								const level = Math.max(
									0,
									Math.min(Math.floor(cell.level ?? 0), 4),
								);
								const fill = `var(--contrib-${level})`;
								const stroke =
									cell.count === 0 ? 'var(--contrib-stroke)' : 'none';
								return (
									<rect
										key={`${wi}-${di}`}
										x={x}
										y={y}
										width={squareSize}
										height={squareSize}
										rx={2}
										style={{ fill, stroke }}
										data-date={cell.date}
										data-count={String(cell.count)}
										data-level={String(level)}
										role="gridcell"
										aria-label={`${cell.date}: ${cell.count} contribution${
											cell.count !== 1 ? 's' : ''
										}`}
									/>
								);
							}),
						)}
					</svg>

					<div
						ref={tooltipRef}
						style={{
							position: 'absolute',
							pointerEvents: 'none',
							display: 'none',
							padding: '6px 8px',
							background: 'var(--tooltip-bg)',
							color: 'var(--tooltip-color)',
							borderRadius: 6,
							fontSize: 12,
							whiteSpace: 'nowrap',
							zIndex: 1000,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
