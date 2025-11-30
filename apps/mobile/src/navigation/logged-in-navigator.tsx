import { AdoptionType } from '@animavita/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import useNextOnboardingScreen from './hooks/use-next-onboarding-screen';

import { useAuth } from '@/hooks/use-auth-provider';
import MyPetsScreen from '@/screens/adoptions/my-pets.screen';
import GetLocationScreen from '@/screens/get-location/get-location.screen';
import HomeScreen from '@/screens/home/home.screen';
import RegisterPet from '@/screens/owner/register-pet/register-pet.screen';
import UpdatePetScreen from '@/screens/owner/update-pet/update-pet.screen';
import PhoneNumberEntryScreen from '@/screens/phone-number-entry/phone-number-entry.screen';
import Profile from '@/screens/profile/profile.screen';
import RoleSelectionScreen from '@/screens/role-selection/role-selection';

export type StackParamsList = {
  Home: undefined;
  RegisterPet: undefined;
  Profile: undefined;
  MyPets: undefined;
  UpdatePet: { pet: AdoptionType };
  GeoLocation: undefined;
  RoleSelection: undefined;
  PhoneNumber: undefined;
};

const Stack = createNativeStackNavigator<StackParamsList>();

const LoggedInNavigator = () => {
  const auth = useAuth();
  const getNextOnboardingScreen = useNextOnboardingScreen();

  const initialRouteName = getNextOnboardingScreen(auth.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="GeoLocation" component={GetLocationScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberEntryScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RegisterPet" component={RegisterPet} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyPets" component={MyPetsScreen} />
      <Stack.Screen name="UpdatePet" component={UpdatePetScreen} />
    </Stack.Navigator>
  );
};

export default LoggedInNavigator;
