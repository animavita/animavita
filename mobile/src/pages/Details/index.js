import React, { useState, useEffect } from 'react';
import GradientButton from '~/components/GradientButton';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Title, H1 } from '~/components';
import { showMessage } from 'react-native-flash-message';
import Swiper from 'react-native-swiper';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { USER_SEND_MESSAGE_MUTATION } from '../Chat';
import useFavorite from '~/hooks/useFavorite';

import {
  TopContent,
  FooterContent,
  ObservationContainer,
  PetData,
  PetDetail,
  BackButton,
  Container,
  PetImage,
  Slide,
  styles,
} from './styles';

const GET_SPECIFIC_ADOPT_BY_ID = gql`
  query getAdopt($id: ID!) {
    adopt(id: $id) {
      _id
      name
      breed
      type
      age
      size
      gender
      firstImage
      type
      images
      age
      observations
      user {
        _id
        fullname
        avatar
      }
    }
  }
`;

const GET_SOLICITATION_IF_EXIST = gql`
  query getSolicitation($id: ID!) {
    solicitationByAdopt(adoptId: $id) {
      _id
    }
  }
`;

const SOLICITATION_TO_ADOPT_MUTATION = gql`
  mutation SolicitationAdoptMutation($adoptId: String!) {
    SolicitationAdoptMutation(input: { adoptId: $adoptId }) {
      solicitation {
        adopt {
          user {
            _id
          }
        }
      }
    }
  }
`;

const Details = ({ navigation }) => {
  const [animal, setAnimal] = useState(navigation.state.params.animal);
  const [solicited, setSolicited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorited, handleFavorite] = useFavorite(animal);

  function throwError() {
    showMessage({
      message: 'Erro ao exibir detalhes da adoção!',
      description:
        'Ops! Algum erro aconteceu ao buscar informações mais detalhadas sobre esta adoção, tente novamente mais tarde!',
      type: 'danger',
    });

    navigation.goBack();
  }

  const { data } = useQuery(GET_SPECIFIC_ADOPT_BY_ID, {
    variables: {
      id: animal._id,
    },
    onError: () => throwError(),
  });

  useQuery(GET_SOLICITATION_IF_EXIST, {
    variables: {
      id: animal._id,
    },
    fetchPolicy: 'no-cache',
    onCompleted: ({ solicitationByAdopt }) => {
      if (solicitationByAdopt) {
        setSolicited(true);
      }
      setLoading(false);
    },
    onError: () => throwError(),
  });

  const [sendMessage] = useMutation(USER_SEND_MESSAGE_MUTATION, {
    onCompleted: ({ SendMessageMutation }) => {
      showMessage({
        message: 'Solicitação enviada com sucesso!',
        description: `Você enviou com sucesso uma solicitação para adotar ${
          animal.name
        }, aguarde até que o responsável envie uma mensagem!`,
        type: 'success',
        duration: 4000,
        backgroundColor: THEME_COLORS.SECONDARY,
      });
      navigation.navigate('Chat', {
        conversation: {
          _id: SendMessageMutation.message.conversation._id,
        },
        user: {
          _id: animal.user._id,
          name: animal.user.fullname,
          avatar: animal.user.avatar,
        },
      });
    },
  });

  const [solicitationToAdopt, { loading: loadingMutation }] = useMutation(
    SOLICITATION_TO_ADOPT_MUTATION,
    {
      onCompleted: ({ SolicitationAdoptMutation }) => {
        sendMessage({
          variables: {
            user: SolicitationAdoptMutation.solicitation.adopt.user._id,
            content: `Olá, eu acabei de solicitar a adoção de ${animal.name}`,
          },
        });
      },
      onError: () => showMessage({
        message: 'Erro ao solicitar adoção!',
        description: `Ops! Algum erro aconteceu ao solicitar a adoção de ${animal.name}`,
        type: 'danger',
      }),
    },
  );

  useEffect(() => {
    if (data.adopt) {
      setAnimal(data.adopt);
    }
  }, [data]);

  function showAdoptImages() {
    const { adopt } = data;

    return adopt.images.map(image => (
      <PetImage
        key={image}
        source={{
          uri: image,
        }}
      />
    ));
  }

  function handleSolicitation() {
    setLoading(true)
    solicitationToAdopt({ variables: { adoptId: animal._id } })
  }

  return (
    <Container>
      <Slide>
        <Swiper
          style={styles.wrapper}
          dotStyle={styles.dot}
          activeDotStyle={styles.dot}
          activeDotColor={THEME_COLORS.SECONDARY}
          dotColor="white"
        >
          {loading ? (
            <PetImage
              source={{
                uri: animal.firstImage,
              }}
            />
          ) : (
            showAdoptImages()
          )}
        </Swiper>
      </Slide>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="ios-arrow-round-back" type="ionicon" color={THEME_COLORS.BLACK} size={40} />
      </BackButton>
      <PetDetail>
        <FooterContent>
          <TopContent>
            <H1 size={35}>{animal.name}</H1>
            <TouchableOpacity style={styles.heart} onPress={() => handleFavorite()}>
              <Icon
                name={favorited ? 'heart' : 'heart-o'}
                raised
                type="font-awesome"
                color={favorited ? '#FF6767' : THEME_COLORS.BLACK}
              />
            </TouchableOpacity>
          </TopContent>

          <PetData>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Raça \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                {animal.breed}
              </Title>
            </Title>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Sexo \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                {animal.gender}
              </Title>
            </Title>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Tamanho \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                {animal.size}
              </Title>
            </Title>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Idade \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                {animal.age} {animal.age > 1 ? 'anos' : 'ano'}
              </Title>
            </Title>
          </PetData>
          <ObservationContainer>
            {loading ? (
              <Title weight="normal" style={styles.observations} color="#c5ccd6" size={11}>
                Carregando...
              </Title>
            ) : (
              <Title weight="normal" style={styles.observations} color="#c5ccd6" size={11}>
                {animal.observations ? animal.observations : 'Sem observações'}
              </Title>
            )}
          </ObservationContainer>
        </FooterContent>
        <GradientButton
          disabled={loadingMutation || solicited || loading}
          loading={loadingMutation || loading}
          onPress={() => handleSolicitation()}
        >
          <Title size={14} color="white">
            {solicited ? 'Aguardando Resposta da Solicitação' : 'Solicitar Adoção'}
          </Title>
        </GradientButton>
      </PetDetail>
    </Container>
  );
};

Details.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Details;
