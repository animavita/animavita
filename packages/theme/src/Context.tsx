import React from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';

import StyledTheme from './Theme';

export const withThemeProvider: (child: React.ComponentType) => React.ComponentType = Child => props => (
  <StyledThemeProvider theme={StyledTheme}>
    <Child {...props} />
  </StyledThemeProvider>
);

export const ThemeContextProvider: React.FC = ({children}) => {
  return <StyledThemeProvider theme={StyledTheme}>{children}</StyledThemeProvider>;
};
