import {View, Text} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DiscoverScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{top}}>
      <Text>DiscoverScreen</Text>
    </View>
  );
};

export default DiscoverScreen;
