import React from 'react';
// import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import {ThemeContext} from '@animavita/theme';

import AuthNavigator from './Auth';
import HomeNavigator from './Home';

const Stack = createStackNavigator();
const {Navigator, Screen} = Stack;

// const RootNavigator = createSwitchNavigator(
//   {
//     Auth: AuthNavigator,
//     Home: HomeNavigator,
//   },
//   {initialRouteName: 'Auth'},
// );

// const AppNavigator = createAppContainer(RootNavigator);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Auth" component={AuthNavigator} />
        <Screen name="Home" component={HomeNavigator} />
      </Navigator>
    </NavigationContainer>
  );
  // return <ThemeContext.Consumer>{theme => <AppNavigator theme={theme.themeName} />}</ThemeContext.Consumer>;
}
