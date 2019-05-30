import { createAppContainer, createStackNavigator } from 'react-navigation';
import React from 'react';

import { Icon } from 'react-native-elements';

import Home from '~/pages/Home';
import Settings from '~/pages/Settings';
import Messages from '~/pages/Messages';
import Chat from '~/pages/Chat';
import Notifications from '~/pages/Notifications';
import Filter from '~/pages/Filter';

const configs = {
  defaultNavigationOptions: {
    headerStyle: {
      height: 16 * 4,
      backgroundColor: '#FFFFFF',
      borderBottomColor: 'transparent',
      elevation: 0,
    },
    headerBackImage: <Icon name="ios-arrow-round-back" type="ionicon" color="#323643" size={40} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: 16,
      paddingRight: 16,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: 16,
    },
  },
};
const MainNavigator = createStackNavigator(
  {
    Home,
    Notifications,
    Messages,
    Chat,
    Settings,
  },
  configs,
);

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
      navigationOptions: {
        header: () => null,
      },
    },
    Filter,
  },
  configs,
  {
    mode: 'modal',
  },
);

export default createAppContainer(RootNavigator);
