import {useContext} from 'react';

import {ThemeContext} from './Context';

export function useTheme() {
  return useContext(ThemeContext);
}
