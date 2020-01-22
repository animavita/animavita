/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useState} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {Theme, ThemeColors} from 'react-navigation';

import StyledTheme, {initialTheme} from './Theme';

export const withThemeProvider: (child: React.ComponentType) => React.ComponentType = Child => props => (
  <StyledThemeProvider theme={StyledTheme}>
    <Child {...props} />
  </StyledThemeProvider>
);

export type PossibleThemes = 'light' | 'dark';
export interface ThemeContextType {
  theme: Theme;
  changeTheme(): void;
  themeName: PossibleThemes;
  setThemeName: React.Dispatch<React.SetStateAction<PossibleThemes>>;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: ThemeColors[initialTheme],
  changeTheme(): void {},
  themeName: initialTheme,
  setThemeName: () => {},
});

export const ThemeContextProvider: React.FC = ({children}) => {
  const [themeName, setThemeName] = useState<PossibleThemes>(initialTheme);

  function changeTheme() {
    if (themeName === 'light') {
      setThemeName('dark');
    } else {
      setThemeName('light');
    }
  }

  return (
    <ThemeContext.Provider value={{theme: ThemeColors[themeName], themeName, setThemeName, changeTheme}}>
      <StyledThemeProvider theme={StyledTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
