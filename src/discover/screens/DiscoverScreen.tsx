import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../components/Box';
import Text from '../../components/Text';
import TouchableItem from '../../components/TouchableItem';
import LinearGradient from 'react-native-linear-gradient';
import MelodiscoverIcon from '../../assets/components/MelodiscoverIcon';
import ConfigurationIcon from '../../assets/components/ConfigurationIcon';
import useQueryMySpotifyProfile from '../../user/login/hooks/useQueryMySpotifyProfile';
import MusicPlayer from '../components/MusicPlayer';
import SavePlaylist from '../components/SavePlaylist';
import {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../navigation.types';
import useMusicStore from '../../store/useMusicStore';
import useQueryRecommendations from '../hooks/useQueryRecommendations';
import {getSeedTracks} from '../discover.utils';
import {Track} from '../discover.types';
import ActivityIndicator from '../../components/ActivityIndicator';
import EmptyStateDiscover from '../components/EmptyStateDiscover';
import {storage} from '../../libs/react-native-mmkv/mmkv';
import {STORAGE_KEYS} from '../../constants';

const WrapperDiscoverScreen = () => {
  const {data: myProfileData} = useQueryMySpotifyProfile();
  const {playlist, setPlaylist, setTracks, tracks} = useMusicStore();
  const [isLoading, setIsLoading] = useState(true);
  const firstTime = useRef(true);

  const {data: recommendationData, isFetching: recommendationLoading} =
    useQueryRecommendations({
      limit: 10,
      market: myProfileData?.country,
      seedTracks: tracks.length ? getSeedTracks(tracks) : '',
    });

  const playlistTracks =
    recommendationData?.tracks.filter(track => !!track.preview_url) || [];

  const recommendationTracks = playlistTracks || tracks;

  useEffect(
    function setInitialStorage() {
      if (firstTime.current) {
        const storedPlaylistName =
          storage.getString(STORAGE_KEYS.PLAYLIST_NAME) || '';
        const storedPlaylistId =
          storage.getString(STORAGE_KEYS.PLAYLIST_ID) || '';
        const storedPlaylistTracks = JSON.parse(
          storage.getString(STORAGE_KEYS.TRACKS) || '[]',
        );

        setPlaylist({id: storedPlaylistId, name: storedPlaylistName});
        setTracks(storedPlaylistTracks);
        firstTime.current = false;
      }
      setIsLoading(false);
    },
    [setPlaylist, setTracks],
  );

  // TODO: add skeleton loading
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <DiscoverScreen
      playlistID={playlist.id}
      playlistName={playlist.name}
      recommendationLoading={recommendationLoading}
      recommendationTracks={recommendationTracks}
    />
  );
};

// useState component

type Props = {
  playlistID: string;
  playlistName: string;
  recommendationLoading: boolean;
  recommendationTracks: Track[] | undefined;
};

const DiscoverScreen = ({
  playlistID,
  playlistName,
  recommendationLoading,
  recommendationTracks,
}: Props) => {
  const navigation = useNavigation<NavigationProp<'DiscoverTab'>>();
  const {top} = useSafeAreaInsets();

  const openFilterModal = useCallback(() => {
    navigation.navigate('PlaylistModalScreen');
  }, [navigation]);

  useEffect(() => {
    if (!playlistName || !playlistID) {
      openFilterModal();
    }
  }, [openFilterModal, playlistID, playlistName]);

  return (
    <LinearGradient
      colors={['#141E30', '#121212']}
      end={{x: 0, y: 1}}
      start={{x: 0, y: 0}}
      style={styles.flex}>
      <Box pt="s" px="m" style={{top}}>
        {/* Header */}
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between">
          <MelodiscoverIcon height={48} width={48} />
          <SavePlaylist onPress={openFilterModal} playlistName={playlistName} />
          <TouchableItem alignItems="center" flexDirection="row">
            <Text fontFamily="Montserrat-Bold" fontSize={16} mr="xxs">
              (1)
            </Text>
            <ConfigurationIcon color={'#ffffff'} height={24} width={24} />
          </TouchableItem>
        </Box>

        {/* 2nd position */}
        {/* <SavePlaylist onPress={openFilterModal} playlistName={playlistName} /> */}

        {/* TODO: Change to skeleton loading */}
        {recommendationLoading && <ActivityIndicator />}

        {recommendationTracks?.length ? (
          <MusicPlayer tracks={recommendationTracks} />
        ) : (
          <EmptyStateDiscover onPress={openFilterModal} />
        )}
      </Box>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default WrapperDiscoverScreen;
