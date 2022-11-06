import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Routes from "../routes";
import Home from "../screens/home";
import RegisterAdoption from "../screens/register-adoption";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen
          name={Routes.RegisterAdoption}
          component={RegisterAdoption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
