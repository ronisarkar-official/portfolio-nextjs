'use client';

import { useEffect, useState, useCallback } from 'react';
import { SiSpotify } from 'react-icons/si';
import Image from 'next/image';
import type { SpotifyData } from '@/lib/spotify';

interface Props {
	initialData: SpotifyData;
}

/**
 * Client component that handles real-time Spotify data polling.
 * Receives initial server-rendered data and updates every 15 seconds.
 */
export default function NowPlayingClient({ initialData }: Props) {
	const [data, setData] = useState<SpotifyData>(initialData);

	const fetchData = useCallback(async () => {
		try {
			const res = await fetch('/api/spotify', {
				cache: 'no-store',
				headers: {
					'Cache-Control': 'no-cache',
				},
			});
			if (res.ok) {
				const json = await res.json();
				setData(json);
			}
		} catch (error) {
			console.error('Error fetching Spotify data:', error);
		}
	}, []);

	useEffect(() => {
		// Poll every 15 seconds for updates
		const interval = setInterval(fetchData, 15000);
		return () => clearInterval(interval);
	}, [fetchData]);

	const containerBase =
		'w-full rounded-lg border transition-colors duration-150';

	return (
		<div
			className="w-full"
			aria-live="polite">
			<div className={`${containerBase} border-gray-200 dark:border-zinc-700`}>
				<div className="flex items-center gap-3 p-3">
					{/* Album artwork or Spotify icon */}
					{data.albumImageUrl ?
						<div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden border ">
							<Image
								src={data.albumImageUrl}
								alt={data.album ?? 'Album artwork'}
								fill
								sizes="56px"
								className="object-cover"
								unoptimized
								priority={false}
							/>
						</div>
					:	<div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden grid place-items-center">
							<SiSpotify
								className="text-2xl text-[#1DB954]"
								aria-hidden
							/>
						</div>
					}

					{/* Song info */}
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<SiSpotify className="text-base text-[#1DB954] flex-shrink-0" />
							<span className="text-xs text-zinc-600 dark:text-zinc-400">
								{data.isPlaying ?
									<span className="flex items-center gap-2">
										<span>Now Playing</span>
										<span className="relative flex h-2 w-2">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-60" />
											<span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]" />
										</span>
									</span>
								:	'Last played'}
							</span>
						</div>

						{/* Title (link if available) */}
						{data.songUrl ?
							<a
								href={data.songUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="block font-medium text-sm text-zinc-900 dark:text-white truncate hover:underline">
								{data.title || 'Unknown Track'}
							</a>
						:	<h3 className="font-medium text-sm text-zinc-900 dark:text-white truncate">
								{data.title || 'Unknown Track'}
							</h3>
						}

						<p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
							by {data.artist || 'Unknown Artist'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
