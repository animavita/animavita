import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignInScreen from '@/screens/signin/signin.screen';
import SignUpScreen from '@/screens/signup/signup.screen';

export type StackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<StackParamsList>();

const LoggedOutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default LoggedOutNavigator;
