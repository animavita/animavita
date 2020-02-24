import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../modules/home/Home';

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

export default HomeNavigator;
