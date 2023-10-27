// https://api.spotify.com/v1/playlists/{playlist_id}/tracks

import {useMutation} from '@tanstack/react-query';
import useFetch from '../../hooks/useFetch';
import {PlaylistsTracksResponse} from '../types/playlistsTracks.types';
import {AxiosRequestConfig} from 'axios';

type Params = {
  playlist_id: string;
  position?: number;
  /**
   * A comma-separated list of Spotify URIs to add, can be track or episode URIs.
   *
   * For example:
   * uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ
   */
  uris?: string;
};

/** @see https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist */
function _mutate(params: Params): AxiosRequestConfig {
  const {playlist_id} = params;
  return {
    method: 'POST',
    params,
    url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
  };
}

export default function useMutateAddItems() {
  const fetch = useFetch<PlaylistsTracksResponse>(_mutate);

  return useMutation((params: Params) => fetch(params));
}
