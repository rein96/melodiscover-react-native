import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';
import LoginScreen from '../user/login/screens/LoginScreen';
import useAuthStore from '../store/useAuthStore';
import useAuthSpotify from '../user/login/hooks/useAuthSpotify';
import useReactotronCustomCommands from '../hooks/useReactotronCustomCommands';
import SplashScreen from './SplashScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {accessTokenExpirationDate, isLoggedIn} = useAuthStore();
  const {getTokensFromStorage, isTokenExpired} = useAuthSpotify();

  const [loading, setLoading] = useState(true);

  useReactotronCustomCommands();

  useEffect(() => {
    const checkTokenValidity = async () => {
      await getTokensFromStorage();
      setLoading(false);
    };

    checkTokenValidity();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const isTokenValid = !isTokenExpired(accessTokenExpirationDate);

  const showTabStack = isTokenValid || isLoggedIn;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showTabStack ? 'Main' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen component={TabStack} name="Main" />
        <Stack.Screen component={LoginScreen} name="Login" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
