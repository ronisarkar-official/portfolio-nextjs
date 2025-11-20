import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  });

  return response.json();
};

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json({ isPlaying: false });
  }

  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    // Fallback to recently played
    const recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayedResponse.ok) {
      const recentlyPlayed = await recentlyPlayedResponse.json();
      if (recentlyPlayed.items && recentlyPlayed.items.length > 0) {
        const track = recentlyPlayed.items[0].track;
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((_artist: any) => _artist.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0].url,
          songUrl: track.external_urls.spotify,
          previewUrl: track.preview_url,
        });
      }
    }
    
    return NextResponse.json({ isPlaying: false });
  }

  const song = await response.json();

  if (song.item === null) {
    // Fallback to recently played
    const recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayedResponse.ok) {
      const recentlyPlayed = await recentlyPlayedResponse.json();
      if (recentlyPlayed.items && recentlyPlayed.items.length > 0) {
        const track = recentlyPlayed.items[0].track;
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((_artist: any) => _artist.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0].url,
          songUrl: track.external_urls.spotify,
          previewUrl: track.preview_url,
        });
      }
    }

    return NextResponse.json({ isPlaying: false });
  }

  const trackId = song.item.id;
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  // Fetch track details to get preview URL (currently-playing doesn't always include it)
  let previewUrl = song.item.preview_url;
  
  if (!previewUrl && trackId) {
    try {
      const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
      if (trackResponse.ok) {
        const trackData = await trackResponse.json();
        previewUrl = trackData.preview_url;
      }
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  console.log('Spotify API Response:', {
    title,
    artist,
    previewUrl,
    hasPreview: !!previewUrl
  });

  return NextResponse.json({
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
    previewUrl,
  });
}
