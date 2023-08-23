import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from './src/theme/ThemeProvider';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/libs/react-query/queryClient';
import AppStack from './src/navigation/AppStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.flex}>
          <QueryClientProvider client={queryClient}>
            <AppStack />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
