import {createStackNavigator} from 'react-navigation-stack';

import SignUp from '../modules/auth/SignUp';
import CheckLogin from '../modules/auth/CheckLogin';

const AuthNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {header: () => null},
    },
    CheckLogin: {
      screen: CheckLogin,
      navigationOptions: {header: () => null},
    },
  },
  {initialRouteName: 'CheckLogin'},
);

export default AuthNavigator;
