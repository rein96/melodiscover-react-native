import {create} from 'zustand';

interface BearState {
  accessToken: string;
  accessTokenExpirationDate: string;
  isLoggedIn: boolean;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setAccessTokenExpirationDate: (expirationDate: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setRefreshToken: (refreshToken: string) => void;
}

const useAuthStore = create<BearState>()(set => ({
  accessToken: '',
  accessTokenExpirationDate: '',
  isLoggedIn: false,
  refreshToken: '',
  setAccessToken: accessToken => {
    set({accessToken});
  },
  setAccessTokenExpirationDate: expirationDate => {
    set({accessTokenExpirationDate: expirationDate});
  },
  setIsLoggedIn: isLoggedIn => {
    set({isLoggedIn});
  },
  setRefreshToken: refreshToken => {
    set({refreshToken});
  },
}));

export default useAuthStore;
