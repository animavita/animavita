import {createStackNavigator} from 'react-navigation-stack';

import Home from '../modules/home/Home';

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {initialRouteName: 'Home'},
);

export default HomeNavigator;
