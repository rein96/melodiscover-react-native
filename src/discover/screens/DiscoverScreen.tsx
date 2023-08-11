import {Dimensions, Image, StyleSheet} from 'react-native';
import {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../../theme/useTheme';
import Box from '../../components/Box';
import Text from '../../components/Text';
import TouchableItem from '../../components/TouchableItem';
import LinearGradient from 'react-native-linear-gradient';
import MelodiscoverIcon from '../../assets/components/MelodiscoverIcon';
import useQueryRecommendations from '../hooks/useQueryRecommendations';
import ConfigurationIcon from '../../assets/components/ConfigurationIcon';
// import {useNavigation} from '@react-navigation/native';
import XIcon from '../../assets/components/XIcon';
import PauseIcon from '../../assets/components/PauseIcon';
import HeartPlusIcon from '../../assets/components/HeartPlusIcon';
import PlayIcon from '../../assets/components/PlayIcon';
import useQueryMySpotifyProfile from '../../user/login/hooks/useQueryMySpotifyProfile';

const DiscoverScreen = () => {
  const {top} = useSafeAreaInsets();

  const [isPlay, setIsPlay] = useState(true);

  const {
    theme: {colors},
  } = useTheme();

  const {data: myProfileData} = useQueryMySpotifyProfile();

  const {data: recommendationData} = useQueryRecommendations({
    limit: 10,
    market: myProfileData?.country,
    seedArtists: '4NHQUGzhtTLFvgF5SZesLK',
    seedGenres: 'classical,country',
    seedTracks: '0c6xIDDpzE81m2q797ordA',
  });

  const track = recommendationData?.tracks[0];
  const trackImage = track?.album.images[0];

  const imageWidth = Dimensions.get('screen').width - 32;

  const openFilterModal = () => {
    // navigation.navigate('MyModal');
  };

  const handlePlayPause = () => {
    setIsPlay(prevState => !prevState);
  };

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
              <Text style={styles.artistName}>{track?.artists[0]?.name}</Text>
            </LinearGradient>
          </Box>
        </Box>

        {/* Action buttons */}
        <Box alignItems="center" flexDirection="row" justifyContent="center">
          <TouchableItem
            backgroundColor="lightPrimary"
            borderRadius="full"
            p="l">
            <XIcon color={colors.inkPrimary} height={28} width={28} />
          </TouchableItem>
          <TouchableItem
            backgroundColor="canvasProduct"
            borderRadius="full"
            mx="m"
            onPress={handlePlayPause}
            p="l">
            {isPlay ? (
              <PauseIcon color={colors.inkPrimary} height={28} width={28} />
            ) : (
              <PlayIcon color={colors.inkPrimary} height={28} width={28} />
            )}
          </TouchableItem>
          <TouchableItem
            backgroundColor="lightPrimary"
            borderRadius="full"
            p="l">
            <HeartPlusIcon color={colors.inkDanger} height={28} width={28} />
          </TouchableItem>
        </Box>
      </Box>
    </LinearGradient>
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
  container: {paddingHorizontal: 16},
  flex: {
    flex: 1,
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

export default DiscoverScreen;
