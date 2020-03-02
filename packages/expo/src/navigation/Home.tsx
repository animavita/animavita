import React from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import {Avatar, Typography} from '@animavita/ui/core';
import {useLazyLoadQuery, graphql} from '@animavita/relay';
import {useTheme, px2ddp, StyledTheme} from '@animavita/theme';

import Home from '../modules/home/Home';

import {HomeQuery} from './__generated__/HomeQuery.graphql';

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC = () => {
  const theme = useTheme();

  const {me} = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        me {
          name
          profileImages {
            url
            providedBy
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  );

  const name = me?.name?.split(' ')[0] || '';
  const uri = me?.profileImages[0].url;

  const backgroundColor = theme.themeName === 'light' ? StyledTheme.white : StyledTheme.black;

  const screenOptions: StackNavigationOptions = {
    headerTitle: '',
    headerLeft: () => <Typography variant="title-3">Olá {name}</Typography>,
    ...(uri && {headerRight: () => <Avatar source={{uri}} />}),
    headerLeftContainerStyle: {marginLeft: px2ddp(10)},
    headerRightContainerStyle: {marginRight: px2ddp(10)},
    cardStyle: {backgroundColor},
    headerStyle: {
      backgroundColor,
      elevation: 0,
      shadowOpacity: 0,
      height: px2ddp(45),
    },
  };

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
