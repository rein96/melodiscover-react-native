import {useQuery} from '@tanstack/react-query';
import useFetch from '../../hooks/useFetch';
import {Recommendations} from '../discover.types';
import {QUERY_KEYS} from '../../constants';

type RecommendationsParams = {
  limit?: number;
  market?: string;
  seedArtists?: string;
  seedGenres?: string;
  seedTracks?: string;
};

const useQueryRecommendations = (params: RecommendationsParams) => {
  const {
    limit = 10,
    market = 'ID',
    seedArtists,
    seedGenres,
    seedTracks,
    // seedArtists = '4NHQUGzhtTLFvgF5SZesLK',
    // seedGenres = 'classical,country',
    // seedTracks = '0c6xIDDpzE81m2q797ordA',
  } = params;

  const fetch = useFetch<Recommendations>(() => ({
    method: 'GET',
    params: {
      limit,
      market,
      ...(seedArtists && {seed_artists: seedArtists}),
      ...(seedGenres && {seed_genres: seedGenres}),
      ...(seedTracks && {seed_tracks: seedTracks}),
    },
    url: 'https://api.spotify.com/v1/recommendations',
  }));

  return useQuery({
    enabled: !!seedArtists || !!seedGenres || !!seedTracks,
    queryFn: () => fetch(),
    queryKey: [QUERY_KEYS.recommendations, params],
  });
};

export default useQueryRecommendations;
