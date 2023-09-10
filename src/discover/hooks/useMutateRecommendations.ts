import {useMutation} from '@tanstack/react-query';
import useFetch from '../../hooks/useFetch';
import {Recommendations} from '../discover.types';

type RecommendationsParams = {
  limit?: number;
  market?: string;
  seedArtists?: string;
  seedGenres?: string;
  seedTracks?: string;
};

function _mutate(params: RecommendationsParams) {
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

  return {
    method: 'GET',
    params: {
      limit,
      market,
      ...(seedArtists && {seed_artists: seedArtists}),
      ...(seedGenres && {seed_genres: seedGenres}),
      ...(seedTracks && {seed_tracks: seedTracks}),
    },
    url: 'https://api.spotify.com/v1/recommendations',
  };
}

export default function useMutateRecommendations() {
  const fetch = useFetch<Recommendations>(_mutate);

  return useMutation((params: RecommendationsParams) => fetch(params));
}
