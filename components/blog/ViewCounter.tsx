'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
	slug: string;
	initialViews?: number;
	trackView?: boolean;
}

export default function ViewCounter({
	slug,
	initialViews = 0,
	trackView = true,
}: ViewCounterProps) {
	const [views, setViews] = useState<number>(initialViews || 0);

	useEffect(() => {
		if (!trackView) return;

		// Optimistic update
		setViews((prev) => prev + 1);

		const incrementViews = async () => {
			try {
				const response = await fetch(`/api/views/${slug}`, {
					method: 'POST',
					cache: 'no-store',
				});

				if (response.ok) {
					const data = await response.json();
					// Update with actual server count (might be higher due to other visitors)
					setViews(data.views);
				}
			} catch (error) {
				console.error('Error incrementing views:', error);
				// Revert optimistic update on error
				setViews((prev) => prev - 1);
			}
		};

		// Increment views on mount
		incrementViews();
	}, [slug, trackView]);

	// Format view count (e.g., 1.2K, 1M)
	const formatViews = (count: number | null | undefined) => {
		if (!count) return '0';
		if (count >= 1000000) {
			return `${(count / 1000000).toFixed(1)}M`;
		}
		if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}K`;
		}
		return count.toString();
	};

	return <span>{formatViews(views)} views</span>;
}
