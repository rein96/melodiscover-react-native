import {Track} from './discover.types';
import {PlaylistsTracksItem} from './types/playlistsTracks.types';

export function getRandomTracks(playlistTracks: PlaylistsTracksItem[]) {
  if (!playlistTracks?.length) return [];

  // Define the minimum and maximum number of tracks to select
  const maxTracks = 5;

  // Determine the number of tracks to select based on the length of playlistTracks
  const numTracks = Math.min(maxTracks, playlistTracks.length);

  // Shuffle the playlistTracks array to ensure randomness
  // map to get only string id
  const shuffledTracks = [...playlistTracks]
    .sort(() => Math.random() - 0.5)
    .map(track => track.track);

  // Return a slice of the shuffledTracks array with the selected number of tracks
  return shuffledTracks.slice(0, numTracks);
}

export function getSeedTracks(tracks: Track[]) {
  const trackIds = tracks.map(track => track.id);
  return trackIds.join(',');
}
