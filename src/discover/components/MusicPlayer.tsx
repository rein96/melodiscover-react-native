import LinearGradient from 'react-native-linear-gradient';
import Box from '../../components/Box';
import TouchableItem from '../../components/TouchableItem';
import XIcon from '../../assets/components/XIcon';
import PauseIcon from '../../assets/components/PauseIcon';
import PlayIcon from '../../assets/components/PlayIcon';
import HeartPlusIcon from '../../assets/components/HeartPlusIcon';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Track} from '../discover.types';
import useTheme from '../../theme/useTheme';
import Text from '../../components/Text';
import {useAudioHelper} from '../hooks/useAudioHelper';
import ActivityIndicator from '../../components/ActivityIndicator';
import {useCallback, useRef} from 'react';
import CardsSwipe from 'react-native-cards-swipe';

type Props = {
  tracks: Track[];
};

type CardsSwipeRefObject = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

const imageWidth = Dimensions.get('screen').width - 32;

const MusicPlayer = ({tracks}: Props) => {
  const {
    theme: {colors},
  } = useTheme();
  const swiper = useRef<CardsSwipeRefObject>(null);

  const audioHelper = useAudioHelper({isLogStatus: true, listSounds: tracks});

  const {next, pause, play, status} = audioHelper;

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

  const skipMusic = () => {
    if (swiper.current) swiper.current.swipeLeft();
  };

  const saveToPlaylist = () => {
    if (swiper.current) swiper.current.swipeRight();
  };

  const renderCard = useCallback(
    (card: Track) => (
      <Box style={styles.cardContainer}>
        {card.album.images[0].url ? (
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
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.01)', '#000000']}
          style={styles.cardGradient}>
          <Text style={styles.trackName}>{card?.name}</Text>
          <Text style={styles.artistName}>{card?.artists[0].name}</Text>
        </LinearGradient>
      </Box>
    ),
    [],
  );

  const renderNoMoreCard = useCallback(
    () => (
      <View style={styles.noMoreCard}>
        <Text>{'No more Cards!'}</Text>
      </View>
    ),
    [],
  );

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
        onSwipedLeft={next}
        onSwipedRight={next}
        ref={swiper}
        renderCard={renderCard}
        renderNoMoreCard={renderNoMoreCard}
        renderNope={renderNope}
        renderYep={renderYep}
      />

      {/* Action buttons */}
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        mt="m">
        <TouchableItem
          backgroundColor="lightPrimary"
          borderRadius="full"
          onPress={skipMusic}
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
          onPress={saveToPlaylist}
          p="l">
          <HeartPlusIcon color={colors.inkDanger} height={28} width={28} />
        </TouchableItem>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  artistName: {
    color: 'white',
    fontSize: 14,
  },
  cardContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  cardGradient: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderRadius: 8,
    bottom: 0,
    left: 0,
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  cardsSwipeContainer: {
    elevation: 1,
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 40,
    zIndex: 1,
  },
  image: {
    borderRadius: 8,
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
  trackName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default MusicPlayer;
