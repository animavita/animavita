import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {ThemeContext} from '@animavita/theme';

import AuthNavigator from './Auth';
import HomeNavigator from './Home';

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Home: HomeNavigator,
  },
  {initialRouteName: 'Auth'},
);

const AppNavigator = createAppContainer(RootNavigator);

export default function Navigation() {
  return <ThemeContext.Consumer>{theme => <AppNavigator theme={theme.themeName} />}</ThemeContext.Consumer>;
}
