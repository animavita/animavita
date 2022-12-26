import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Routes from '../routes';
import Home from '../screens/home/home.screen';
import RegisterAdoption from '../screens/register-adoption/register-adoption.screen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.RegisterAdoption}>
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen name={Routes.RegisterAdoption} component={RegisterAdoption} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
