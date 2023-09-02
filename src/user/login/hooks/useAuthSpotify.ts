import {
  AuthConfiguration,
  AuthorizeResult,
  RefreshResult,
  authorize,
  refresh,
  revoke,
} from 'react-native-app-auth';
import useAuthStore from '../../../store/useAuthStore';
import {storage} from '../../../libs/react-native-mmkv/mmkv';
import {STORAGE_KEYS} from '../../../constants';

const clientId = 'CLIENT_ID';
const redirectUrl = 'com.phrasewizard:/oauth';

const config: AuthConfiguration = {
  clientId,
  issuer: 'https://accounts.spotify.com',
  redirectUrl,
  scopes: [
    'user-read-email',
    'user-read-playback-state',
    'user-read-private',
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
    'user-modify-playback-state',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
  ], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const useAuthSpotify = () => {
  const {
    accessToken,
    isLoggedIn,
    setAccessToken,
    setAccessTokenExpirationDate,
    setIsLoggedIn,
    setRefreshToken,
  } = useAuthStore();

  /**
   * @TODO use `prefetchConfiguration` for ANDROID
   * This will prefetch the authorization service configuration.
   * Invoking this function is optional and will speed up calls to authorize.
   * This is only supported on Android.
   *
   * @see https://github.com/FormidableLabs/react-native-app-auth#prefetchconfiguration
   */
  async function loginSpotify() {
    try {
      const result = await authorize(config);
      if (result.accessToken) {
        setIsLoggedIn(true);
        setTokensToState(result);
        setTokensToStorage(result);
      }
      return result;
    } catch (error) {
      //  Spotify authorization error: [Error: The operation couldn’t be completed. (org.openid.appauth.general error -3.)]
      console.error('Spotify authorization error:');
      console.log('ERROR: loginSpotify', error);
      return null;
    }
  }

  const setTokensToState = (result: AuthorizeResult | RefreshResult) => {
    setAccessToken(result.accessToken);
    setAccessTokenExpirationDate(result.accessTokenExpirationDate);
    setRefreshToken(result.refreshToken as string);
  };

  const setTokensToStorage = (result: AuthorizeResult | RefreshResult) => {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, result.accessToken);
    storage.set(
      STORAGE_KEYS.ACCESS_TOKEN_EXPIRATION_DATE,
      result.accessTokenExpirationDate,
    );
    if (result.refreshToken) {
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, result.refreshToken);
    }
  };

  const refreshSpotifyToken = async (refreshToken: string) => {
    try {
      const result = await refresh(config, {
        refreshToken,
      });

      if (!result.accessToken) {
        throw new Error('refreshSpotifyToken is ERROR :(');
      }

      setTokensToState(result);
      setTokensToStorage(result);

      if (!isLoggedIn) {
        setIsLoggedIn(true);
      }

      return result;
    } catch (error) {
      console.log('ERROR: refreshSpotifyToken', error);
    }
  };

  const getTokensFromStorage = async () => {
    const storageAccessToken =
      storage.getString(STORAGE_KEYS.ACCESS_TOKEN) ?? '';
    const storageAccessTokenExpirationDate =
      storage.getString(STORAGE_KEYS.ACCESS_TOKEN_EXPIRATION_DATE) ?? '';
    const storageRefreshToken =
      storage.getString(STORAGE_KEYS.REFRESH_TOKEN) ?? '';

    if (
      !storageAccessToken ||
      !storageAccessTokenExpirationDate ||
      !storageRefreshToken
    )
      return;

    if (isTokenExpired(storageAccessTokenExpirationDate)) {
      return await refreshSpotifyToken(storageRefreshToken);
    }

    // If token is not expired -> set tokens from storage to state immediately
    setAccessToken(storageAccessToken);
    setAccessTokenExpirationDate(storageAccessTokenExpirationDate);
    setRefreshToken(storageRefreshToken);
    setIsLoggedIn(true);
  };

  const removeTokensFromStorage = () => {
    storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
    storage.delete(STORAGE_KEYS.ACCESS_TOKEN_EXPIRATION_DATE);
    storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
  };

  const isTokenExpired = (accessTokenExpirationDate: string) => {
    if (!accessTokenExpirationDate) {
      return true; // Treat as expired if expiration date is missing or invalid
    }

    const expirationDate = new Date(accessTokenExpirationDate);
    const currentDate = new Date();

    return currentDate > expirationDate;
  };

  const logoutSpotify = async () => {
    await revoke(config, {
      includeBasicAuth: true,
      sendClientId: true,
      tokenToRevoke: accessToken,
    });
    removeTokensFromStorage();
    setIsLoggedIn(false);
  };

  return {
    getTokensFromStorage,
    isTokenExpired,
    loginSpotify,
    logoutSpotify,
    refreshSpotifyToken,
    removeTokensFromStorage,
  };
};

export default useAuthSpotify;
