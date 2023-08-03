import {createContext} from 'react';
import {Theme, darkTheme} from './theme';
import {DEFAULT_THEME_MODE, ThemeMode} from './theme.types';

type ThemeContextProps = {
  setThemeMode: (mode: ThemeMode) => void;
  theme: Theme;
  themeMode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextProps>({
  setThemeMode: () => {},
  theme: darkTheme,
  themeMode: DEFAULT_THEME_MODE,
});

export default ThemeContext;
