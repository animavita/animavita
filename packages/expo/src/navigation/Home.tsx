import React, {useRef} from 'react';
import {Pressable, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Avatar, Typography} from '@animavita/ui/core';
import {useLazyLoadQuery, graphql} from '@animavita/relay';
import {useTheme, px2ddp, StyledTheme} from '@animavita/theme';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {useI18n} from '@animavita/i18n';
import {URL} from 'react-native-url-polyfill';

import Home from '../modules/home/Home';

import {HomeQuery} from './__generated__/HomeQuery.graphql';

interface MenuRef {
  hide: () => void;
  show: () => void;
}

const StyledMenu = styled(Menu)`
  margin-top: ${px2ddp(20)}px;
`;

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC = () => {
  const menu = useRef<MenuRef>(null);
  const navigation = useNavigation();
  const theme = useTheme();
  const {t} = useI18n(['tab_bar']);

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
  const imageIndex = me ? me.profileImages.length - 1 : 0;
  const uri = me?.profileImages[imageIndex].url;

  const getPictureUrl = (url: string) => {
    if (Platform.OS === 'android') {
      const urlObject = new URL(url);
      const port = urlObject.port;
      const pathname = urlObject.pathname;

      return `http://10.0.2.2:${port}/${pathname}`;
    }

    return url;
  };

  const backgroundColor = theme.themeName === 'light' ? StyledTheme.white : StyledTheme.black;

  const hideMenu = () => {
    if (menu.current) {
      menu.current.hide();
    }
  };

  const showMenu = () => {
    if (menu.current) {
      menu.current.show();
    }
  };

  const handleLogout = async () => {
    hideMenu();
    await AsyncStorage.clear();
    navigation.navigate('SignUp');
  };

  const HeaderRight = () => {
    return (
      <StyledMenu
        ref={menu}
        button={
          <Pressable onPress={showMenu}>
            <Avatar source={{uri: getPictureUrl(uri)}} />
          </Pressable>
        }>
        <MenuItem onPress={hideMenu} disabled>
          {t('options.settings')}
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={handleLogout}>{t('options.logout')}</MenuItem>
      </StyledMenu>
    );
  };

  const screenOptions: StackNavigationOptions = {
    headerTitle: '',
    headerLeft: () => <Typography variant="title-3">{t('greetings', {name})}</Typography>,
    ...(uri && {headerRight: () => <HeaderRight />}),
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
