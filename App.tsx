import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from './src/theme/ThemeProvider';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/libs/react-query/queryClient';
import AppStack from './src/navigation/AppStack';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppStack />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
