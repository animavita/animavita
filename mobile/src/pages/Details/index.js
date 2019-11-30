import React, { useState, useEffect } from 'react';
import GradientButton from '~/components/GradientButton';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { Title, H1 } from '~/components';
import { showMessage } from 'react-native-flash-message';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  const [slide, setActiveSlide] = useState(0);
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
      onError: () => {
        setLoading(false);
        return showMessage({
          message: 'Erro ao solicitar adoção!',
          description: `Ops! Algum erro aconteceu ao solicitar a adoção de ${animal.name}`,
          type: 'danger',
        });
      },
    },
  );

  useEffect(() => {
    if (data && data.adopt) {
      setAnimal(data.adopt);
    }
  }, [animal, data]);


  function showAdoptImages({ item }) {
    return (
      <PetImage
        source={{
          uri: item,
        }}
      />
    );
  }

  function handleSolicitation() {
    setLoading(true);
    solicitationToAdopt({ variables: { adoptId: animal._id } });
  }

  return (
    <Container>
      <Slide>
        {loading
          ? (
            <PetImage
              source={{
                uri: animal.firstImage,
              }}
            />
          )
          : (
            <Carousel
              sliderWidth={styles.slider}
              itemWidth={styles.slider}
              data={data.adopt.images}
              renderItem={item => showAdoptImages(item)}
              onSnapToItem={(index) => {
                setActiveSlide(index);
              }
            }
            />
          )
        }
        {data && data.adopt
        && (
          <View style={styles.dotContainer}>
            <Pagination
              dotsLength={data.adopt.images.length}
              activeDotIndex={slide}
              containerStyle={styles.container}
              dotColor={THEME_COLORS.PRIMARY}
              inactiveDotColor="#FFF"
              dotStyle={styles.dot}
            />
          </View>
        )
        }
      </Slide>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="ios-arrow-round-back" type="ionicon" color={THEME_COLORS.BLACK} size={hp('5%')} />
      </BackButton>
      <PetDetail>
        <FooterContent>
          <TopContent>
            <H1 size={5}>{animal.name}</H1>
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
            <Title size={3} weight="bold" color={THEME_COLORS.BLACK}>
              {'Raça \n'}
              <Title size={2.3} weight="normal" color="#c5ccd6">
                {animal.breed}
              </Title>
            </Title>
            <Title size={3} weight="bold" color={THEME_COLORS.BLACK}>
              {'Sexo \n'}
              <Title size={2.3} weight="normal" color="#c5ccd6">
                {animal.gender}
              </Title>
            </Title>
            <Title size={3} weight="bold" color={THEME_COLORS.BLACK}>
              {'Tamanho \n'}
              <Title size={2.3} weight="normal" color="#c5ccd6">
                {animal.size}
              </Title>
            </Title>
            <Title size={3} weight="bold" color={THEME_COLORS.BLACK}>
              {'Idade \n'}
              <Title size={2.3} weight="normal" color="#c5ccd6">
                {animal.age} {animal.age > 1 ? 'anos' : 'ano'}
              </Title>
            </Title>
          </PetData>
          <ObservationContainer>
            {loading ? (
              <Title size={3} weight="normal" style={styles.observations} color="#c5ccd6">
                Carregando...
              </Title>
            ) : (
              <Title size={2.3} weight="normal" style={styles.observations} color="#c5ccd6">
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
          <Title size={2.3} color="white">
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
