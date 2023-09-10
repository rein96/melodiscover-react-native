// https://api.spotify.com/v1/playlists/{playlist_id}/tracks

import {useMutation} from '@tanstack/react-query';
import useFetch from '../../hooks/useFetch';
import {PlaylistsTracksResponse} from '../types/playlistsTracks.types';

type Params = {
  additional_types?: string;
  fields?: string;
  limit?: number;
  market?: string;
  offset?: number;
};

type MutateParams = Params & {
  playlistId: string;
};

function _mutate(params: MutateParams) {
  const {playlistId} = params;
  return {
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
  };
}

export default function useMutatePlaylistTracks() {
  const fetch = useFetch<PlaylistsTracksResponse>(_mutate);

  return useMutation((params: MutateParams) => fetch(params));
}
