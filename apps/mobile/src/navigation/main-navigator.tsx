import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAuth } from '@/hooks/use-auth-provider';
import Routes from '@/routes';
import MyAdoptions from '@/screens/adoptions/adoptions.screen';
import GetLocation from '@/screens/get-location/get-location.screen';
import Home from '@/screens/home/home.screen';
import Profile from '@/screens/profile/profile.screen';
import RegisterAdoption from '@/screens/register-adoption/register-adoption.screen';
import SignInScreen from '@/screens/signin/signin.screen';
import SignUpScreen from '@/screens/signup/signup.screen';
import SplashScreen from '@/screens/splash/splash.screen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const auth = useAuth();

  if (auth.status === 'IDLE') return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.Home}>
        {auth.status === 'LOGGED' ? (
          <>
            <Stack.Screen name={Routes.Home} component={Home} />
            <Stack.Screen name={Routes.RegisterAdoption} component={RegisterAdoption} />
            <Stack.Screen name={Routes.Profile} component={Profile} />
            <Stack.Screen name={Routes.MyAdoptions} component={MyAdoptions} />
          </>
        ) : (
          <>
            <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
            <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
            <Stack.Screen name={Routes.GetLocation} component={GetLocation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
