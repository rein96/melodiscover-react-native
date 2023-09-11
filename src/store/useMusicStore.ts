import {create} from 'zustand';
import {Track} from '../discover/discover.types';
import {storage} from '../libs/react-native-mmkv/mmkv';
import {STORAGE_KEYS} from '../constants';

type PlaylistState = {
  id: string;
  name: string;
};

interface MusicState {
  playlist: PlaylistState;
  setPlaylist: ({id, name}: PlaylistState) => void;
  setTracks: (tracks: Track[]) => void;
  tracks: Track[];
}

const useMusicStore = create<MusicState>()(set => ({
  playlist: {
    id: '',
    name: '',
  },
  setPlaylist({id, name}) {
    set({playlist: {id, name}});
    storage.set(STORAGE_KEYS.PLAYLIST_ID, id);
    storage.set(STORAGE_KEYS.PLAYLIST_NAME, name);
  },
  setTracks: tracks => {
    set({tracks});
    storage.set(STORAGE_KEYS.TRACKS, JSON.stringify(tracks));
  },
  tracks: [],
}));

export default useMusicStore;
