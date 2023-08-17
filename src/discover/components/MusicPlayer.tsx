import LinearGradient from 'react-native-linear-gradient';
import Box from '../../components/Box';
import TouchableItem from '../../components/TouchableItem';
import XIcon from '../../assets/components/XIcon';
import PauseIcon from '../../assets/components/PauseIcon';
import PlayIcon from '../../assets/components/PlayIcon';
import HeartPlusIcon from '../../assets/components/HeartPlusIcon';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Track} from '../discover.types';
import useTheme from '../../theme/useTheme';
import Text from '../../components/Text';
import {useAudioHelper} from '../hooks/useAudioHelper';
import ActivityIndicator from '../../components/ActivityIndicator';

type Props = {
  tracks: Track[];
};
const imageWidth = Dimensions.get('screen').width - 32;

const MusicPlayer = ({tracks}: Props) => {
  const {
    theme: {colors},
  } = useTheme();

  const audioHelper = useAudioHelper({isLogStatus: true, listSounds: tracks});

  const {musicIndex, next, pause, play, previous, status} = audioHelper;

  const track = tracks[musicIndex];
  const trackImage = track?.album.images[0];

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

  return (
    <>
      {/* Card */}
      <Box mt="m">
        <Box style={styles.cardContainer}>
          {trackImage?.url ? (
            <Image
              height={imageWidth}
              resizeMode="cover"
              source={{uri: trackImage?.url}}
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
            style={styles.gradient}>
            <Text style={styles.trackName}>{track?.name}</Text>
            <Text style={styles.artistName}>{track?.artists[0].name}</Text>
          </LinearGradient>
        </Box>
      </Box>

      {/* Action buttons */}
      <Box alignItems="center" flexDirection="row" justifyContent="center">
        <TouchableItem
          backgroundColor="lightPrimary"
          borderRadius="full"
          onPress={previous}
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
          onPress={next}
          p="l">
          <HeartPlusIcon color={colors.inkDanger} height={28} width={28} />
        </TouchableItem>
      </Box>
    </>
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
  gradient: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderRadius: 8,
    bottom: 0,
    left: 0,
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  image: {
    borderRadius: 8,
  },
  trackName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default MusicPlayer;
