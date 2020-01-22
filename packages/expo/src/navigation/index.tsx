import React from 'react';
import {createAppContainer} from 'react-navigation';

import {ThemeContext} from '@animavita/theme';

import HomeNavigator from './Home';

const AppNavigator = createAppContainer(HomeNavigator);

export default function Navigation() {
  return <ThemeContext.Consumer>{theme => <AppNavigator theme={theme.themeName} />}</ThemeContext.Consumer>;
}
