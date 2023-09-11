import {FlatList, ListRenderItemInfo, Pressable} from 'react-native';
import Box from '../../components/Box';
import Text from '../../components/Text';
import ArrowIcon from '../../assets/components/ArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import PlaylistItem from '../components/PlaylistItem';
import {PlaylistItemResponse} from '../types/myplaylist.types';
import useQueryMyPlaylist from '../hooks/useQueryMyPlaylist';
import {NavigationProp} from '../../navigation.types';
import useMutatePlaylistTracks from '../hooks/useMutatePlaylistTracks';
import {getRandomTracks} from '../discover.utils';
import useQueryMySpotifyProfile from '../../user/login/hooks/useQueryMySpotifyProfile';
import useMusicStore from '../../store/useMusicStore';
import SpinnerOverlay from '../../components/SpinnerOverlay';

const PlaylistModalScreen = () => {
  const navigation = useNavigation<NavigationProp<'PlaylistModalScreen'>>();

  const [isProcessing, setIsProcessing] = useState(false);

  const {setPlaylist, setTracks} = useMusicStore();

  const {data: myProfileData} = useQueryMySpotifyProfile();
  const {data: myPlaylistData} = useQueryMyPlaylist({limit: 20});

  const {mutateAsync: mutatePlaylistTracks} = useMutatePlaylistTracks();

  const userPlaylistItems = myPlaylistData?.items?.filter(
    item => item.owner.id === myProfileData?.id,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleSelectPlaylistItem = useCallback(
    async (item: PlaylistItemResponse) => {
      setIsProcessing(true);
      const playlistTracks = await mutatePlaylistTracks({playlistId: item.id});

      const randomTracks = getRandomTracks(playlistTracks.items);

      // TODO fix this typing
      // PlaylistTracks mirip2 sama Track
      setTracks(randomTracks);

      setPlaylist({id: item.id, name: item.name});

      setIsProcessing(false);
      navigation.navigate('DiscoverTab');
    },
    [mutatePlaylistTracks, navigation, setPlaylist, setTracks],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<PlaylistItemResponse>) => {
      return (
        <PlaylistItem
          item={item}
          onPress={handleSelectPlaylistItem}
          selectedPlaylistId={''}
        />
      );
    },
    [handleSelectPlaylistItem],
  );

  const keyExtractor = (item: PlaylistItemResponse) => item.id;

  return (
    <Box bg="canvasPrimary" borderRadius="s" flex={1} p="m">
      {/* Header */}
      <Box flexDirection="row" pb="s">
        <Pressable hitSlop={8} onPress={goBack}>
          <ArrowIcon direction="left" height={28} width={24} />
        </Pressable>
        <Box alignItems="center" flex={1} mr="l">
          <Text fontFamily="Montserrat-Bold" fontSize={16} textAlign="center">
            Select a Playlist
          </Text>
        </Box>
        <Box />
      </Box>

      <SpinnerOverlay text="Loading New Songs..." visible={isProcessing} />

      <FlatList
        data={userPlaylistItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollIndicatorInsets={{right: 1}}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default PlaylistModalScreen;
