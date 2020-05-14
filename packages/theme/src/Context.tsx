/* eslint-disable @typescript-eslint/no-empty-function */

import React, {useState} from 'react';
import {ThemeProvider as StyledThemeProvider, DefaultTheme as StyledDefaultTheme} from 'styled-components/native';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';

import StyledTheme, {initialTheme} from './Theme';

export type PossibleThemes = 'light' | 'dark';

interface ThemeContextProviderProps {
  theme?: PossibleThemes;
}
export interface ThemeContextType {
  theme: Theme;
  changeTheme(): void;
  themeName: PossibleThemes;
  setThemeName: React.Dispatch<React.SetStateAction<PossibleThemes>>;
  styledTheme: StyledDefaultTheme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: initialTheme === 'light' ? DefaultTheme : DarkTheme,
  changeTheme(): void {},
  themeName: initialTheme,
  setThemeName: () => {},
  styledTheme: StyledTheme,
});

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({theme, children}) => {
  const [themeName, setThemeName] = useState<PossibleThemes>(theme || initialTheme);

  function changeTheme() {
    if (themeName === 'light') {
      setThemeName('dark');
    } else {
      setThemeName('light');
    }
  }

  const value = {
    theme: themeName === 'light' ? DefaultTheme : DarkTheme,
    themeName,
    setThemeName,
    changeTheme,
    styledTheme: StyledTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={StyledTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
