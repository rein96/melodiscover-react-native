import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverScreen from './src/discover/screens/DiscoverScreen';
import LoginScreen from './src/user/login/screens/LoginScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './src/settings/screens/SettingsScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from './src/theme/ThemeProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen component={DiscoverScreen} name="Discover" />
    <Tab.Screen component={SettingsScreen} name="Settings" />
  </Tab.Navigator>
);

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [authenticated] = React.useState(true);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {authenticated ? (
                <Stack.Screen component={MainTabs} name="Main" />
              ) : (
                <Stack.Screen component={LoginScreen} name="Login" />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
