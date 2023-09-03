import {useQuery} from '@tanstack/react-query';
import useFetch from '../../hooks/useFetch';
import {QUERY_KEYS} from '../../constants';
import {PlaylistResponse} from '../types/myplaylist.types';

type Params = {
  limit?: number;
  offset?: number;
};

const useQueryMyPlaylist = (params: Params) => {
  const fetch = useFetch<PlaylistResponse>(() => ({
    method: 'GET',
    params,
    url: 'https://api.spotify.com/v1/me/playlists',
  }));

  return useQuery({
    queryFn: fetch,
    queryKey: [QUERY_KEYS.mePlaylist, params],
  });
};

export default useQueryMyPlaylist;
