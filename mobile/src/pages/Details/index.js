import React from 'react';
import GradientButton from '~/components/GradientButton';
import PropTypes from 'prop-types';
import { Title, H1 } from '~/components';
import { showMessage } from 'react-native-flash-message';
import Swiper from 'react-native-swiper';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '~/components/Loading';

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
      type
      images
      observations
    }
  }
`;

const Details = ({ navigation }) => {
  const { animal } = navigation.state.params;
  const { loading, data } = useQuery(GET_SPECIFIC_ADOPT_BY_ID, {
    variables: {
      // eslint-disable-next-line no-underscore-dangle
      id: animal._id,
    },
    onError: () => {
      showMessage({
        message: 'Erro na listagem de adoções!',
        description:
          'Ops! Alguns animais escaparam dos nossos abraços, tente novamente mais tarde!',
        type: 'danger',
      });

      navigation.goBack();
    },
  });

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
          <PetImage
            source={{
              uri: animal.firstImage,
            }}
          />
          {!loading
            && data.adopt.images.slice(1).map(image => (
              <PetImage
                key={image}
                source={{
                  uri: image,
                }}
              />
            ))}
        </Swiper>
      </Slide>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="ios-arrow-round-back" type="ionicon" color={THEME_COLORS.BLACK} size={40} />
      </BackButton>
      <PetDetail>
        <FooterContent>
          <TopContent>
            <H1 size={35}>{animal.name}</H1>
            <Icon
              raised
              name="heart"
              type="font-awesome"
              color="#FF6767"
              containerStyle={styles.heart}
              onPress={() => console.log('hello')}
            />
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
                1 ano
              </Title>
            </Title>
          </PetData>
          <ObservationContainer>
            {loading ? (
              <Loading size={30} />
            ) : (
              <Title weight="normal" color="#c5ccd6" numberOfLines={4} size={11}>
                {data.adopt.observations ? data.adopt.observations : '\nSem observações'}
              </Title>
            )}
          </ObservationContainer>
        </FooterContent>
        <GradientButton disabled={false} onPress={() => setFinishStep(false)}>
          <Title size={14} color="white">
            Solicitar Adoção
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
