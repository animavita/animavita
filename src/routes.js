import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import React from 'react';

import { Icon } from 'react-native-elements';
import Main from '~/pages/Main';
import Adopt from '~/pages/Adopt';
import NewAdopt from '~/pages/NewAdopt';
import styled from 'styled-components';
import { PRIMARY_COLOR } from '~/utils/constants';

const BottomNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-keypad" type="ionicon" color={tintColor} size={24} />
        ),
      }),
    },
    Adopt: {
      screen: Adopt,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="paw" type="font-awesome" color={tintColor} size={24} />
        ),
      }),
      headerMode: 'none',
    },
    Rescue: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Container>
            <GameButton>
              <Icon name="paw" type="font-awesome" color="#ffffff" size={24} />
            </GameButton>
          </Container>
        ),
      }),
    },
    Notification: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="heart" type="entypo" color={tintColor} size={26} />
        ),
      }),
    },
    Configurations: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-settings" type="ionicon" color={tintColor} size={26} />
        ),
      }),
    },
  },

  {
    tabBarOptions: {
      activeTintColor: PRIMARY_COLOR,
      inactiveTintColor: '#B6B5B5',
      showLabel: false,
      style: {
        borderTopColor: '#ffff',
        backgroundColor: '#ffff',
        height: 55,
        padding: 5,
      },
    },
    initialRouteName: 'Adopt',
  },
);

const RootNavigator = createStackNavigator(
  {
    TabBar: BottomNavigator,
    NewAdopt: {
      screen: NewAdopt,
      headerMode: 'none',
      navigationOptions: {
        headerVisible: true,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export const GameButton = styled.View`
  height: 40;
  width: 40;
  background-color: ${PRIMARY_COLOR};
  border-radius: 20;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  height: 70;
  width: 75;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 38;
  border-top-right-radius: 38;
`;

export default createAppContainer(RootNavigator);
