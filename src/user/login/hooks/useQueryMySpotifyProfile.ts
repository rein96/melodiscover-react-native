import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../../constants';
import useFetch from '../../../hooks/useFetch';
import {MySpotifyProfile} from '../user.types';

const useQueryMySpotifyProfile = () => {
  const fetch = useFetch<MySpotifyProfile>(() => ({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
  }));

  return useQuery({queryFn: () => fetch(), queryKey: [QUERY_KEYS.profileMe]});
};

export default useQueryMySpotifyProfile;
