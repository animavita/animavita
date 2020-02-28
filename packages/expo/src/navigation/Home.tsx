import React from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import {Avatar, Typography} from '@animavita/ui/core';
import {useQuery, graphql} from '@animavita/relay';

import Home from '../modules/home/Home';

import {HomeQuery} from './__generated__/HomeQuery.graphql';

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC = () => {
  const {props, error} = useQuery<HomeQuery>(
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

  if (!props || error) return null;

  const {me} = props;

  const screenOptions: StackNavigationOptions = {
    headerTitle: '',
    headerLeft: () => <Typography variant="title-3">Olá {me?.name?.split(' ')[0]}</Typography>,
    headerRight: () => (
      <Avatar
        source={{
          uri: me?.profileImages
            ? me.profileImages[0].url
            : 'https://avatars2.githubusercontent.com/u/43140758?s=460&v=4',
        }}
        width={48}
        height={48}
      />
    ),
  };

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
