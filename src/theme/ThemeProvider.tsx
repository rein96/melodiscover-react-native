import {ThemeProvider as RestyleThemeProvider} from '@shopify/restyle';
import React, {useCallback, useMemo, useState} from 'react';
import {storage} from '../libs/react-native-mmkv/mmkv';
import {darkTheme, lightTheme} from './theme';
import ThemeContext from './ThemeContext';
import {DEFAULT_THEME_MODE} from './theme.types';
import {StatusBar} from 'react-native';

type ThemeMode = 'light' | 'dark';
type Props = {
  children: React.ReactNode;
};
const C_STORAGE_THEME_MODE = 'theme_mode';

const ThemeProvider = ({children}: Props) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (storage.getString(C_STORAGE_THEME_MODE) ??
      DEFAULT_THEME_MODE) as ThemeMode,
  );

  const isDark = themeMode === 'dark';
  const currentTheme = isDark ? darkTheme : lightTheme;
  const barStyle = isDark ? 'light-content' : 'dark-content';

  const handleSetThemeMode = useCallback(
    (mode: ThemeMode) => {
      if (themeMode !== mode) {
        setThemeMode(mode);
        storage.set(C_STORAGE_THEME_MODE, mode);
      }
    },
    [themeMode],
  );

  const value = useMemo(
    () => ({setThemeMode: handleSetThemeMode, theme: currentTheme, themeMode}),
    [currentTheme, handleSetThemeMode, themeMode],
  );

  return (
    <RestyleThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={value}>
        <StatusBar
          backgroundColor={currentTheme.colors.canvasPrimary}
          barStyle={barStyle}
        />
        {children}
      </ThemeContext.Provider>
    </RestyleThemeProvider>
  );
};

export default ThemeProvider;
