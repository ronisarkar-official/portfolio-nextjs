'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VisitorCounterProps {
	className?: string;
}

function formatOrdinal(n: number): string {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n.toLocaleString() + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function VisitorCounter({
	className = '',
}: VisitorCounterProps) {
	const [count, setCount] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function trackVisitor() {
			try {
				// Increment count on every page visit
				const response = await fetch('/api/visitors', { method: 'POST' });
				const data = await response.json();

				if (response.ok && data.count !== undefined) {
					setCount(data.count);
				} else {
					// If POST fails, try to GET the current count
					const getResponse = await fetch('/api/visitors');
					const getData = await getResponse.json();
					setCount(getData.count || 0);
				}
			} catch (error) {
				console.error('Error tracking visitor:', error);
				setCount(0);
			} finally {
				setIsLoading(false);
			}
		}

		trackVisitor();
	}, []);

	return (
		<div
			className={`inline-flex items-center gap-2 px-4 py-2 rounded-md 
				bg-muted dark:bg-muted/80
				border border-border
				backdrop-blur-sm
				shadow-sm
				transition-colors duration-200
				${className}`}>
			<Eye className="w-4 h-4 text-muted-foreground" />
			<span className="text-sm text-muted-foreground font-mono">
				{isLoading ?
					<span className="animate-pulse">Loading...</span>
				:	<>
						You are the{' '}
						<span className="text-foreground font-semibold">
							{count !== null && count > 0 ? formatOrdinal(count) : '1st'}
						</span>{' '}
						visitor
					</>
				}
			</span>
		</div>
	);
}
