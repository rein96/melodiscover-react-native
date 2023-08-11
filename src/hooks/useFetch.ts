import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import useAuthStore from '../store/useAuthStore';
import useAuthSpotify from '../user/login/hooks/useAuthSpotify';

export type GeneralErrorResponse = AxiosError<{message?: string}>;

const instance = axios.create({
  // 2 minutes
  timeout: 1000 * 60 * 2,
});

export const fetch = <T>(params: AxiosRequestConfig): AxiosPromise<T> =>
  instance(params);

export default function useFetch<TResponse = unknown, TArgs = unknown>(
  fn: (args?: TArgs) => AxiosRequestConfig,
) {
  const {accessToken, accessTokenExpirationDate, refreshToken} = useAuthStore();
  const {isTokenExpired, refreshSpotifyToken} = useAuthSpotify();

  return async (args?: TArgs): Promise<TResponse> => {
    let freshAccessToken;
    if (isTokenExpired(accessTokenExpirationDate)) {
      const result = await refreshSpotifyToken(refreshToken);
      freshAccessToken = result?.accessToken;
    }

    const config = fn(args);

    const headers = {
      ...(freshAccessToken || accessToken
        ? {
            Authorization: `Bearer ${freshAccessToken || accessToken}`,
          }
        : {}),
      ...config.headers,
    };

    const result: AxiosResponse<TResponse> = await fetch<TResponse>({
      ...config,
      headers,
    });

    return result.data;
  };
}
