import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{top}}>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
