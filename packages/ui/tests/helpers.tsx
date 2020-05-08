import React, {ReactElement, Children} from 'react';
import {render} from '@testing-library/react-native';
import {ThemeContextProvider} from '@animavita/theme';

export const ThemeContext = (children: ReactElement) => <ThemeContextProvider>{children}</ThemeContextProvider>;
export const Mount = (children: ReactElement) => render(<ThemeContextProvider>{children}</ThemeContextProvider>);
