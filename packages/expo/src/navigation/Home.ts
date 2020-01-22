import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/Home';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default HomeNavigator;
