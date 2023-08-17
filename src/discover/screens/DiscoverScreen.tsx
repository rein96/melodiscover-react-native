import {StyleSheet} from 'react-native';
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

const DiscoverScreen = () => {
  const {top} = useSafeAreaInsets();

  const {data: myProfileData} = useQueryMySpotifyProfile();

  const {data: recommendationData, isLoading} = useQueryRecommendations({
    limit: 10,
    market: myProfileData?.country,
    seedArtists: '4NHQUGzhtTLFvgF5SZesLK',
    seedGenres: 'pop',
    seedTracks: '6YArEquYF9TDuqofFO9CY7',
  });

  const recommendationTracks = recommendationData?.tracks.filter(
    track => !!track.preview_url,
  );

  const openFilterModal = () => {
    // navigation.navigate('MyModal');
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

        {!isLoading && !!recommendationTracks && (
          <MusicPlayer tracks={recommendationTracks} />
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

export default DiscoverScreen;
