import {createStackNavigator} from 'react-navigation-stack';

import SignUp from '../screens/SignUp';

const AuthNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {header: () => null},
    },
  },
  {initialRouteName: 'SignUp'},
);

export default AuthNavigator;
