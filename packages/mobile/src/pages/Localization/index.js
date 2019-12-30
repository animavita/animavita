import React, { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from 'react-native-flash-message';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { H1, Title } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import GradientButton from '~/components/GradientButton';
import { THEME_COLORS } from '~/utils/constants';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Content, Research, Container, Header, Footer, styles
} from './styles';
import { Creators as AuthCreators } from '~/store/ducks/auth';

const GET_LOCALIZATION = gql`
  query getLocalization($latitude: Float!, $longitude: Float!) {
    localization(latitude: $latitude, longitude: $longitude) {
      state
      city
    }
  }
`;

const USER_SAVE_ADDRESS_MUTATION = gql`
  mutation SaveAddressMutation(
    $state: String!
    $city: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    SaveAddressMutation(
      input: { state: $state, city: $city, latitude: $latitude, longitude: $longitude }
    ) {
      user {
        address {
          state
          city
        }
      }
    }
  }
`;

const Localization = ({ navigation }) => {
  const [local, setLocalization] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [image] = useState(require('~/images/localization.jpg'));
  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [saveAddress] = useMutation(USER_SAVE_ADDRESS_MUTATION, {
    onCompleted: ({ SaveAddressMutation }) => {
      setLoading(false);
      dispatch(
        AuthCreators.setAuth({
          ...auth,
          address: SaveAddressMutation.user.address
        }),
      );

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignedIn' })]
      });
      navigation.dispatch(resetAction);
    },
    onError: () => {
      showMessage({
        message: 'Erro ao buscar sua localização!',
        description:
          'Ops! Você acredita que o gatinho quase quebrou o GPS? Tente liga-lo novamente.',
        type: 'danger'
      });
      setLoading(false);
    }
  });

  const [getLocalization] = useLazyQuery(GET_LOCALIZATION, {
    onCompleted: ({ localization }) => {
      setLocalization(localization);
      setLoading(false);
    }
  });

  function getLocation() {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        getLocalization({
          variables: {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        });
        setCoordinates(coords);
      },
      () => {
        showMessage({
          message: 'Erro ao buscar sua localização!',
          description:
            'Ops! Você acredita que o gatinho quase quebrou o GPS? Tente liga-lo novamente.',
          type: 'danger'
        });
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 0 },
    );
  }

  return (
    <Container>
      <Header>
        <H1>{`Olá ${auth.name}, \nprecisamos da sua`}</H1>
        <Title size={26} color={THEME_COLORS.SECONDARY}>
          localização
        </Title>
      </Header>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={image}
      />
      {local ? (
        <Content>
          <Title size={12} color={THEME_COLORS.GREY} weight="normal">
            Você está em
          </Title>
          <Title size={18} color={THEME_COLORS.BLACK}>
            {local.city} - {local.state}
          </Title>
        </Content>
      ) : null}
      <Footer>
        {local ? (
          <>
            <GradientButton
              onPress={() => {
                setLoading(true);
                saveAddress({
                  variables: {
                    state: local.state,
                    city: local.city,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                  }
                });
              }}
              disabled={loading}
              loading={loading}
            >
              <Title size={12} color="white">
                Confirmar minha localização
              </Title>
            </GradientButton>
            <Research
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 30,
                right: 30
              }}
              disabled={loading}
              onPress={() => getLocation()}
            >
              <Title size={12} color={THEME_COLORS.GREY} weight="normal">
                Buscar localização novamente
              </Title>
            </Research>
          </>
        ) : (
          <GradientButton onPress={() => getLocation()} disabled={loading} loading={loading}>
            <Title size={12} color="white">
              Compartilhar minha localização
            </Title>
          </GradientButton>
        )}
      </Footer>
    </Container>
  );
};

Localization.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Localization;
