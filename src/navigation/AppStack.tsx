import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';
import LoginScreen from '../user/login/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [authenticated] = React.useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {authenticated ? (
          <Stack.Screen component={TabStack} name="Main" />
        ) : (
          <Stack.Screen component={LoginScreen} name="Login" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
