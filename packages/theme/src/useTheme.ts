import {useContext} from 'react';

import {ThemeContext, ThemeContextType} from './Context';

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
