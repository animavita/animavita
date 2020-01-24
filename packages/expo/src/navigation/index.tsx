import React from 'react';
import {createAppContainer} from 'react-navigation';

import {ThemeContext} from '@animavita/theme';

import AuthNavigator from './Auth';

const AppNavigator = createAppContainer(AuthNavigator);

export default function Navigation() {
  return <ThemeContext.Consumer>{theme => <AppNavigator theme={theme.themeName} />}</ThemeContext.Consumer>;
}
