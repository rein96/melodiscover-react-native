import Box from '../../components/Box';
import TouchableItem from '../../components/TouchableItem';
import XIcon from '../../assets/components/XIcon';
import PauseIcon from '../../assets/components/PauseIcon';
import PlayIcon from '../../assets/components/PlayIcon';
import HeartPlusIcon from '../../assets/components/HeartPlusIcon';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import {Artist2, Track} from '../discover.types';
import useTheme from '../../theme/useTheme';
import Text from '../../components/Text';
import {useAudioHelper} from '../hooks/useAudioHelper';
import ActivityIndicator from '../../components/ActivityIndicator';
import {useCallback, useEffect, useRef} from 'react';
import CardsSwipe from 'react-native-cards-swipe';
import {useNavigation} from '@react-navigation/native';
import SpotifyLogo from '../../assets/images/Spotify_Icon_RGB_Green.png';
import useMutateAddItems from '../hooks/useMutateAddItems';
import useMusicStore from '../../store/useMusicStore';

type Props = {
  refetch: () => void;
  tracks: Track[];
};

type CardsSwipeRefObject = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

const imageWidth = Dimensions.get('screen').width - 32;

const MusicPlayer = ({refetch, tracks}: Props) => {
  const {
    theme: {colors},
  } = useTheme();
  const swiper = useRef<CardsSwipeRefObject>(null);
  const navigation = useNavigation();

  const playlistId = useMusicStore(state => state.playlist.id);
  const {mutateAsync} = useMutateAddItems();

  const audioHelper = useAudioHelper({isLogStatus: true, listSounds: tracks});
  const {musicIndex, next, pause, play, status, stop} = audioHelper;

  const onPress = () => {
    if (status === 'play') return pause();

    play();
  };

  const renderMainIcon = () => {
    if (status === 'play') {
      return <PauseIcon color={colors.inkPrimary} height={28} width={28} />;
    }
    if (status === 'loading') {
      return <ActivityIndicator size={'small'} />;
    }

    return <PlayIcon color={colors.inkPrimary} height={28} width={28} />;
  };

  const handleSkipItem = () => {
    if (swiper.current) swiper.current.swipeLeft();
  };

  const handleHeartItem = () => {
    if (swiper.current) swiper.current.swipeRight();
  };

  const openSpotifyApp = ({
    externalUrl,
    uri,
  }: {
    externalUrl: string;
    uri: string;
  }) => {
    // Use the Spotify URI or external URL to open the Spotify app
    // const spotifyUri = 'spotify:track:3imt8APLtyXVGsLZM362nA'; // Replace with your Spotify URI

    // Check if the Spotify app is installed on the device
    Linking.canOpenURL(externalUrl)
      .then(supported => {
        if (supported) {
          // Spotify app is installed, open it
          return Linking.openURL(externalUrl);
        } else {
          // Spotify app is not installed, you can open the external URL
          // const externalUrl =
          //   'https://open.spotify.com/track/3imt8APLtyXVGsLZM362nA'; // Replace with your Spotify URL
          return Linking.openURL(externalUrl);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const renderCard = useCallback((card: Track) => {
    const getArtistsText = (artists: Artist2[]) => {
      const artistNames = artists.map(artist => artist.name);
      return artistNames.join(', ');
    };

    const handleSpotifyLogoIcon = () => {
      Alert.alert(
        'Open and Listen on Spotify?',
        `You are about to play ${card.name} on Spotify`,
        [
          {
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () =>
              openSpotifyApp({
                externalUrl: card.external_urls.spotify,
                uri: card.uri,
              }),
            text: 'OK',
          },
        ],
      );
    };

    return (
      <Box borderRadius="m">
        {card?.album?.images?.[0]?.url ? (
          <Image
            height={imageWidth}
            resizeMode="cover"
            source={{uri: card.album.images[0].url}}
            style={styles.image}
            width={imageWidth}
          />
        ) : (
          <Box
            backgroundColor="canvasPrimary"
            height={imageWidth}
            width={imageWidth}
          />
        )}
        {/* <LinearGradient
          colors={['rgba(0, 0, 0, 0.01)', '#000000']}
          style={styles.cardGradient}>
          <Text style={styles.trackName}>{card?.name}</Text>
          <Text style={styles.artistName}>{card?.artists[0].name}</Text>
        </LinearGradient> */}
        <Box
          alignItems="center"
          bg="canvasShadow"
          flexDirection="row"
          justifyContent="space-between"
          p="xs">
          <Box>
            <Text
              color="inkPrimary"
              fontFamily="Montserrat-SemiBold"
              mb="xxxs"
              variant="label16">
              {card?.name}
            </Text>
            <Text color="inkSecondary" variant="label12">
              {getArtistsText(card?.artists)}
            </Text>
          </Box>
          <TouchableItem onPress={handleSpotifyLogoIcon}>
            <Image source={SpotifyLogo} style={styles.SpotifyLogoImage} />
          </TouchableItem>
        </Box>
      </Box>
    );
  }, []);

  const renderNoMoreCard = useCallback(
    () => (
      <View style={styles.noMoreCard}>
        <Text>{'No more Cards!'}</Text>
      </View>
    ),
    [],
  );

  const onNoMoreCards = useCallback(() => {
    stop();
    refetch();
  }, [refetch, stop]);

  const renderNope = useCallback(
    () => (
      <View style={styles.nope}>
        <Text style={styles.nopeLabel}>SKIP</Text>
      </View>
    ),
    [],
  );

  const renderYep = useCallback(
    () => (
      <View style={styles.like}>
        <Text style={styles.likeLabel}>SAVE</Text>
      </View>
    ),
    [],
  );

  const saveToPlaylist = useCallback(async () => {
    await mutateAsync({playlist_id: playlistId, uris: tracks[musicIndex].uri});
    next();
  }, [musicIndex, mutateAsync, next, playlistId, tracks]);

  // useEffect(() => {
  //   if (!isFocused) {
  //     return pause();
  //   }
  // }, [isFocused, pause, play]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Do something when the screen blurs
      pause();
    });

    return unsubscribe;
  }, [navigation, pause]);

  return (
    <Box
      alignItems="center"
      height={Dimensions.get('screen').height * 0.75}
      // height={Dimensions.get('screen').height - 50 - 52}
      justifyContent="center">
      <CardsSwipe
        cardContainerStyle={styles.cardContainer}
        cards={tracks}
        containerStyle={styles.cardsSwipeContainer}
        loop={false}
        onNoMoreCards={onNoMoreCards}
        onSwipedLeft={next}
        onSwipedRight={saveToPlaylist}
        ref={swiper}
        renderCard={renderCard}
        renderNoMoreCard={renderNoMoreCard}
        renderNope={renderNope}
        renderYep={renderYep}
      />

      {/* Action buttons */}
      <Box
        alignItems="center"
        // flex={1}
        flexDirection="row"
        justifyContent="center"
        mt="m">
        <TouchableItem
          backgroundColor="lightPrimary"
          borderRadius="full"
          onPress={handleSkipItem}
          p="l">
          <XIcon color={colors.inkPrimary} height={28} width={28} />
        </TouchableItem>
        <TouchableItem
          alignItems="center"
          backgroundColor="canvasProduct"
          borderRadius="full"
          height={80}
          justifyContent="center"
          mx="m"
          onPress={onPress}
          p="l"
          width={80}>
          {renderMainIcon()}
        </TouchableItem>
        <TouchableItem
          backgroundColor="lightPrimary"
          borderRadius="full"
          onPress={handleHeartItem}
          p="l">
          <HeartPlusIcon color={colors.inkDanger} height={28} width={28} />
        </TouchableItem>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  SpotifyLogoImage: {height: 20, width: 20},
  // artistName: {
  //   color: 'white',
  //   fontSize: 14,
  // },
  cardContainer: {
    marginBottom: 8,
    position: 'relative',
  },
  // cardGradient: {
  //   borderBottomLeftRadius: 8,
  //   borderBottomRightRadius: 8,
  //   borderRadius: 8,
  //   bottom: 0,
  //   left: 0,
  //   padding: 10,
  //   position: 'absolute',
  //   right: 0,
  // },
  cardsSwipeContainer: {
    elevation: 1,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
    paddingTop: 40,
    zIndex: 1,
  },
  image: {
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },
  like: {
    borderColor: 'lightgreen',
    borderRadius: 6,
    borderWidth: 10,
    marginLeft: 16,
    marginTop: 32,
    padding: 8,
    transform: [{rotateZ: '-22deg'}],
  },
  likeLabel: {
    color: 'lightgreen',
    fontSize: 24,
    fontWeight: 'bold',
  },
  noMoreCard: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  nope: {
    borderColor: 'red',
    borderRadius: 6,
    borderWidth: 5,
    marginRight: 16,
    marginTop: 25,
    padding: 8,
    transform: [{rotateZ: '22deg'}],
  },
  nopeLabel: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // trackName: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 4,
  // },
});

export default MusicPlayer;
