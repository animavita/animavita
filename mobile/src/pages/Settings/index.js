import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Divider } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  Logout, Container, System, styles,
} from './styles';
import Distance from './components/Distance';
import Personal from './components/Personal';
import Notification from './components/Notification';
import Profile from '~/components/Profile';
import { Title } from '~/components';

const GET_ME_QUERY = gql`
  query getAuthenticatedUser {
    me {
      name
      lastname
      email
      hero
      notifications
    }
  }
`;

const Settings = ({ navigation }) => {
  const [user, setUser] = useState({});
  const { data, loading } = useQuery(GET_ME_QUERY, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (!loading) {
      setUser(data.me);
    }
  }, [data]);

  async function logout() {
    await AsyncStorage.clear();

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignedOut' })],
    });
    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <Profile title="Perfil" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Personal user={user} />
        <Divider style={styles.divider} />
        <Distance />
        <Divider style={styles.divider} />
        <Notification user={user} />
        <System>
          <Logout onPress={() => logout()}>
            <Title color="red" size={14} weight="normal">
              SAIR
            </Title>
          </Logout>
        </System>
      </ScrollView>
    </Container>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default Settings;
