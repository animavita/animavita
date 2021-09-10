import {useI18n} from '@animavita/i18n';
import {graphql, useLazyLoadQuery} from '@animavita/relay';
import {px2ddp, StyledTheme, useTheme} from '@animavita/theme';
import {Avatar, Typography} from '@animavita/ui/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Popover} from 'react-native-popper';
import styled from 'styled-components/native';

import Home from '../modules/home/Home';

import {HomeQuery} from './__generated__/HomeQuery.graphql';

const MenuContainer = styled.View`
  elevation: 4;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  border-radius: ${px2ddp(2)}px;
  background-color: ${({theme}) => theme.white};
`;

const MenuItem = styled.TouchableOpacity`
  padding: ${px2ddp(8)}px;
`;

const MenuDivider = styled.View`
  border-bottom-color: ${({theme}) => theme.greyLight};
  border-bottom-width: ${px2ddp(0.3)}px;
`;

const ItemText = styled(Typography).attrs({variant: 'body'})`
  color: ${({theme}) => theme.black};
`;

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const {t} = useI18n(['tab_bar']);

  const {me} = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        me {
          name
          profileImage
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  );

  const name = me?.name?.split(' ')[0] || '';
  const uri = me?.profileImage;

  const backgroundColor = theme.themeName === 'light' ? StyledTheme.white : StyledTheme.black;

  const handleLogout = async () => {
    setMenuOpen(false);
    await AsyncStorage.clear();
    navigation.navigate('SignUp');
  };

  const HeaderRight = () => {
    return (
      <Popover
        on="press"
        placement="bottom right"
        isOpen={menuOpen}
        onOpenChange={setMenuOpen}
        offset={4}
        trigger={
          <Pressable>
            <Avatar source={{uri}} />
          </Pressable>
        }>
        <Popover.Backdrop />
        <Popover.Content>
          <MenuContainer>
            <MenuItem>
              <ItemText variant="body">{t('options.settings')}</ItemText>
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={handleLogout}>
              <ItemText>{t('options.logout')}</ItemText>
            </MenuItem>
          </MenuContainer>
        </Popover.Content>
      </Popover>
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
