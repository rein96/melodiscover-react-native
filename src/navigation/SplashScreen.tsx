import {ActivityIndicator, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#141E30', '#121212']}
      end={{x: 0, y: 1}}
      start={{x: 0, y: 0}}
      style={styles.container}>
      <ActivityIndicator />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    borderRadius: 5,
    height: 200,
    justifyContent: 'center',
    width: 350,
  },
});

export default SplashScreen;
