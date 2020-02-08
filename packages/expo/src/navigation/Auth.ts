import {createStackNavigator} from 'react-navigation-stack';

import SignUp from '../modules/signUp/SignUp';

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
