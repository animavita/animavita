import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../modules/auth/SignUp';
import CheckLogin from '../modules/auth/CheckLogin';

const AuthStack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="CheckLogin" screenOptions={{gestureEnabled: false}}>
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="CheckLogin" component={CheckLogin} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
