import { cn } from '@/lib/utils';

interface AvailabilityBadgeProps {
	className?: string;
}

export default function AvailabilityBadge({ className }: AvailabilityBadgeProps) {
	return (
		<div
			className={cn(
				'flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
				className
			)}>
			<span className="relative flex h-2 w-2">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
				<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
			</span>
			Open to Work
		</div>
	);
}
