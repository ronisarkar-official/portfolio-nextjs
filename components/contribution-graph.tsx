import { getGitHubContributions, Activity } from '@/lib/github-contributions';
import ContributionGraphClient from './contribution-graph-client';
import './contribution-graph.css';

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

interface GridData {
	weeks: Activity[][];
	width: number;
	height: number;
	monthLabels: string[];
	totalContributions: number;
}

function buildContributionGrid(
	data: Activity[],
	squareSize: number,
	gap: number,
): GridData {
	const map = new Map<string, Activity>();
	for (const item of data) {
		map.set(normalizeDateString(item.date), {
			...item,
			date: normalizeDateString(item.date),
		});
	}

	// Compute start timestamp aligned to Sunday, ensuring the last column
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
		const contrib = map.get(iso) ?? { date: iso, count: 0, level: 0 as const };
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
	const totalContributions = data.reduce((acc, curr) => acc + curr.count, 0);

	return { weeks, width, height, monthLabels, totalContributions };
}

/**
 * Server-rendered GitHub contribution graph component.
 * Fetches data and computes grid on server for optimal performance.
 */
export default async function ContributionGraph({
	className = '',
	squareSize = 13.6,
	gap = 3,
}: Props) {
	// Fetch data on server
	const data = await getGitHubContributions();

	// Build grid on server
	const { weeks, width, height, monthLabels, totalContributions } =
		buildContributionGrid(data, squareSize, gap);

	return (
		<div
			className={`relative overflow-x-auto md:overflow-x-visible max-w-full ${className}`}
			style={{ width: width + 'px' }}>
			{/* Header with Total Contributions */}
			<div className="flex items-center justify-between mb-4 px-6 md:px-0">
				<div className="flex flex-col">
					<span className="text-3xl font-semibold text-foreground">
						GitHub Activity
					</span>
					<span className="text-md text-muted-foreground">
						Total: {totalContributions} contributions
					</span>
				</div>
			</div>

			{/* Month labels row */}
			<div
				className="flex mb-1 text-xs text-muted-foreground flex-row ml-2 md:ml-2"
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
				{/* SVG grid with client-side tooltip */}
				<ContributionGraphClient>
					<svg
						width={width}
						height={height}
						role="img"
						aria-label="Contribution graph">
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
				</ContributionGraphClient>
			</div>
		</div>
	);
}
