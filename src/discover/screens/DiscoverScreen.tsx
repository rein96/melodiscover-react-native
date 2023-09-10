import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../components/Box';
import Text from '../../components/Text';
import TouchableItem from '../../components/TouchableItem';
import LinearGradient from 'react-native-linear-gradient';
import MelodiscoverIcon from '../../assets/components/MelodiscoverIcon';
import useQueryRecommendations from '../hooks/useQueryRecommendations';
import ConfigurationIcon from '../../assets/components/ConfigurationIcon';
import useQueryMySpotifyProfile from '../../user/login/hooks/useQueryMySpotifyProfile';
import MusicPlayer from '../components/MusicPlayer';
import SavePlaylist from '../components/SavePlaylist';
import useQueryMyPlaylist from '../hooks/useQueryMyPlaylist';
import {useCallback, useEffect, useState} from 'react';
import SelectPlaylistModal from '../components/SelectPlaylistModal';
import useMutatePlaylistTracks from '../hooks/useMutatePlaylistTracks';
import {PlaylistItemResponse} from '../types/myplaylist.types';
import {PlaylistsTracksItem} from '../types/playlistsTracks.types';
import {StyleSheet} from 'react-native';
import useMutateRecommendations from '../hooks/useMutateRecommendations';

function getRandomTracks(playlistTracks: PlaylistsTracksItem[]) {
  if (!playlistTracks?.length) return [];

  // Define the minimum and maximum number of tracks to select
  const maxTracks = 5;

  // Determine the number of tracks to select based on the length of playlistTracks
  const numTracks = Math.min(maxTracks, playlistTracks.length);

  // Shuffle the playlistTracks array to ensure randomness
  // map to get only string id
  const shuffledTracks = [...playlistTracks]
    .sort(() => Math.random() - 0.5)
    .map(track => track.track.id);

  // Return a slice of the shuffledTracks array with the selected number of tracks
  return shuffledTracks.slice(0, numTracks);
}

// QUERIES / ENDPOINT component

// useState component

const DiscoverScreen = () => {
  const {top} = useSafeAreaInsets();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistId, setselectedPlaylistId] = useState('');

  const {data: myProfileData} = useQueryMySpotifyProfile();

  const {data: myPlaylistData} = useQueryMyPlaylist({limit: 20});
  // console.log('111 myPlaylistData', myPlaylistData);

  const {
    data: playlistsTracksData,
    isLoading: playlistsTrackLoading,
    mutateAsync: mutatePlaylistTracks,
  } = useMutatePlaylistTracks();
  // ini kenapa hit berkali2 ???
  console.log('111 useMutatePlaylistTracks', {
    playlistsTrackLoading,
    playlistsTracksData,
  });

  // const playlistTracks = playlistsTracksData?.items;

  // const randomTracks = getRandomTracks(playlistTracks);
  // console.log('randomTracks', randomTracks);

  const {
    data: recommendationData,
    isLoading: recommendationLoading,
    mutateAsync: mutateRecommendations,
  } = useMutateRecommendations();
  console.log('recommendationData', recommendationData);

  // const {data: recommendationData, isLoading: recommendationLoading} =
  //   useQueryRecommendations({
  //     limit: 10,
  //     market: myProfileData?.country,
  //     seedTracks: randomTracks.length
  //       ? randomTracks.join(',')
  //       : '6YArEquYF9TDuqofFO9CY7',
  //   });

  const userPlaylistItems = myPlaylistData?.items?.filter(
    item => item.owner.id === myProfileData?.id,
  );

  const recommendationTracks = recommendationData?.tracks.filter(
    track => !!track.preview_url,
  );

  const playlistName = userPlaylistItems?.find(
    playlist => playlist.id === selectedPlaylistId,
  )?.name;

  const openFilterModal = () => {
    // navigation.navigate('MyModal');
  };

  const handleShowPlaylistModal = () => {
    setShowPlaylistModal(true);
  };

  const handleHidePlaylistModal = () => {
    setShowPlaylistModal(false);
  };

  const handleSelectPlaylistItem = useCallback(
    async (item: PlaylistItemResponse) => {
      console.log('111 handleSelectPlaylistItem', item);
      setselectedPlaylistId(item.id);
      handleHidePlaylistModal();

      const playlistTracks = await mutatePlaylistTracks({playlistId: item.id});

      const randomTracks = getRandomTracks(playlistTracks.items);

      await mutateRecommendations({
        limit: 10,
        market: myProfileData?.country,
        seedTracks: randomTracks.length
          ? randomTracks.join(',')
          : '6YArEquYF9TDuqofFO9CY7',
      });
    },
    [mutatePlaylistTracks, mutateRecommendations, myProfileData?.country],
  );

  useEffect(() => {
    if (!selectedPlaylistId) {
      return handleShowPlaylistModal();
    }
  }, []);

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
          <SavePlaylist
            onPress={handleShowPlaylistModal}
            playlistName={playlistName}
          />
          <TouchableItem
            alignItems="center"
            flexDirection="row"
            onPress={openFilterModal}>
            <Text fontFamily="Montserrat-Bold" fontSize={16} mr="xxs">
              (1)
            </Text>
            <ConfigurationIcon color={'#ffffff'} height={24} width={24} />
          </TouchableItem>
        </Box>

        {!recommendationLoading && !!recommendationTracks && (
          <MusicPlayer tracks={recommendationTracks} />
        )}

        <SelectPlaylistModal
          onClose={handleHidePlaylistModal}
          onPressItem={handleSelectPlaylistItem}
          playlistItems={userPlaylistItems}
          selectedPlaylistId={selectedPlaylistId}
          setselectedPlaylistId={setselectedPlaylistId}
          visible={showPlaylistModal}
        />
      </Box>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default DiscoverScreen;
