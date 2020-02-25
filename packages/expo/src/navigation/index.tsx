import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ThemeContext} from '@animavita/theme';

import AuthNavigator from './Auth';
import HomeNavigator from './Home';

const Stack = createStackNavigator();
const {Navigator, Screen} = Stack;

export default function Navigation() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <NavigationContainer theme={theme.theme}>
          <Navigator headerMode="none" screenOptions={{gestureEnabled: false}}>
            <Screen name="Auth" component={AuthNavigator} />
            <Screen name="Home" component={HomeNavigator} />
          </Navigator>
        </NavigationContainer>
      )}
    </ThemeContext.Consumer>
  );
}
