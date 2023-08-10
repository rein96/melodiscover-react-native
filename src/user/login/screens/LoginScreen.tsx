import {Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MelodiscoverIcon from '../../../assets/components/MelodiscoverIcon';
import Text from '../../../components/Text';
import Box from '../../../components/Box';
import TouchableItem from '../../../components/TouchableItem';
import useAuthSpotify from '../hooks/useAuthSpotify';
import {useNavigation, CommonActions} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {loginSpotify} = useAuthSpotify();
  const screenWidth = Dimensions.get('window').width;

  const handleLogin = async () => {
    const result = await loginSpotify();

    if (result?.accessToken) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    }
  };

  return (
    <LinearGradient
      colors={['#141E30', '#121212']}
      end={{x: 0, y: 1}}
      start={{x: 0, y: 0}}
      style={styles.container}>
      <MelodiscoverIcon height={160} width={160} />
      <Text fontFamily="Montserrat-Bold" mt="xs" variant="h2">
        Melodiscover
      </Text>
      <Box mb="xxxl" mt="m" width={300}>
        <Text
          color="inkSecondary"
          fontFamily="Montserrat-SemiBold"
          numberOfLines={2}
          textAlign="center"
          variant="label16">
          Discover a world of music with Melodiscover.
        </Text>
      </Box>
      <TouchableItem
        backgroundColor="canvasProduct"
        borderRadius="m"
        onPress={handleLogin}
        px="m"
        py="m"
        style={{width: screenWidth - 32}}>
        <Text fontFamily="Montserrat-Bold" textAlign="center">
          Log in with Spotify
        </Text>
      </TouchableItem>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  linearGradient: {
    alignItems: 'center',
    borderRadius: 5,
    height: 200,
    justifyContent: 'center',
    width: 350,
  },
});

export default LoginScreen;
