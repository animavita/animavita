import React, {ReactElement} from 'react';
import {render} from '@testing-library/react-native';

import {ThemeContextProvider} from '@animavita/theme';

export const Mount = (children: ReactElement) => render(<ThemeContextProvider>{children}</ThemeContextProvider>);
