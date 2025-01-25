import { UserType } from '@animavita/types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAuth } from '@/hooks/use-auth-provider';
import MyPetsScreen from '@/screens/adoptions/my-pets.screen';
import GetLocationScreen from '@/screens/get-location/get-location.screen';
import HomeScreen from '@/screens/home/home.screen';
import Profile from '@/screens/profile/profile.screen';
import RegisterAdoption from '@/screens/register-adoption/register-adoption.screen';
import SignInScreen from '@/screens/signin/signin.screen';
import SignUpScreen from '@/screens/signup/signup.screen';
import SplashScreen from '@/screens/splash/splash.screen';

export type StackParamsList = {
  Home: undefined;
  RegisterAdoption: undefined;
  Profile: undefined;
  MyPets: undefined;
  SignIn: undefined;
  SignUp: undefined;
  GeoLocation: { user: UserType };
};

const Stack = createNativeStackNavigator<StackParamsList>();

const MainNavigator = () => {
  const auth = useAuth();

  if (auth.status === 'IDLE') return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        {auth.status === 'LOGGED' ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RegisterAdoption" component={RegisterAdoption} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="MyPets" component={MyPetsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="GeoLocation" component={GetLocationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
