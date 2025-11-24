import { getSpotifyDataCached } from '@/lib/spotify';
import NowPlayingClient from './NowPlaying-client';

/**
 * Server-rendered Spotify "Now Playing" component.
 * Fetches initial data on server for instant display,
 * then client component polls for updates every 30 seconds.
 */
export default async function NowPlaying() {
	// Fetch initial data on server (cached for 30s)
	const initialData = await getSpotifyDataCached();

	// Pass to client component for polling
	return <NowPlayingClient initialData={initialData} />;
}
