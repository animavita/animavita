import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import {ThemeContext} from '@animavita/theme';
import {useI18nController} from '@animavita/i18n';

import RegisterAdoption from '../modules/adoption/RegisterAdoption';

import HomeNavigator from './Home';
import AuthNavigator from './Auth';

const Stack = createStackNavigator();
const {Navigator, Screen} = Stack;

export default function Navigation() {
  const {setLocale} = useI18nController();

  useEffect(() => {
    setLocale(Localization.locale);
  }, []);

  return (
    <ThemeContext.Consumer>
      {theme => (
        <NavigationContainer theme={theme.theme}>
          <Navigator headerMode="none" screenOptions={{gestureEnabled: false}} initialRouteName="Auth">
            <Screen name="Auth" component={AuthNavigator} />
            <Screen name="Home" component={HomeNavigator} />
            <Screen name="Register Adoption" component={RegisterAdoption} />
          </Navigator>
        </NavigationContainer>
      )}
    </ThemeContext.Consumer>
  );
}
