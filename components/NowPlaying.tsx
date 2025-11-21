import { getSpotifyData } from '@/lib/spotify';
import NowPlayingClient from './NowPlaying-client';

/**
 * Server-rendered Spotify "Now Playing" component.
 * Fetches initial data on server for instant display,
 * then client component polls for updates every 30 seconds.
 */
export default async function NowPlaying() {
	// Fetch initial data on server
	const initialData = await getSpotifyData();

	// Pass to client component for polling
	return <NowPlayingClient initialData={initialData} />;
}
