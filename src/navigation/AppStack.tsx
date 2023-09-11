import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';
import LoginScreen from '../user/login/screens/LoginScreen';
import useAuthStore from '../store/useAuthStore';
import useAuthSpotify from '../user/login/hooks/useAuthSpotify';
import useReactotronCustomCommands from '../hooks/useReactotronCustomCommands';
import SplashScreen from './SplashScreen';
import PlaylistModalScreen from '../discover/screens/PlaylistModalScreen';

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
        initialRouteName={showTabStack ? 'MainStack' : 'LoginScreen'}>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen component={TabStack} name="MainStack" />
          <Stack.Screen component={LoginScreen} name="LoginScreen" />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
          }}>
          <Stack.Screen
            component={PlaylistModalScreen}
            name="PlaylistModalScreen"
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// function ModalScreen({navigation}) {
//   return (
//     <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
//       <Text style={{fontSize: 30}}>This is a modal!</Text>
//       <Button onPress={() => navigation.goBack()} title="Dismiss" />
//     </View>
//   );
// }

export default AppStack;
