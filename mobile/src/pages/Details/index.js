import React, { useState, useEffect } from 'react';
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
    }
  }
`;

const Details = ({ navigation }) => {
  const [animal, setAnimal] = useState(navigation.state.params.animal);
  const { loading, data } = useQuery(GET_SPECIFIC_ADOPT_BY_ID, {
    variables: {
      id: animal._id,
    },
    onError: () => {
      showMessage({
        message: 'Erro ao exibir detalhes da adoção!',
        description:
          'Ops! Algum erro aconteceu ao buscar informações mais detalhadas sobre esta adoção, tente novamente mais tarde!',
        type: 'danger',
      });

      navigation.goBack();
    },
  });

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
            <Icon
              raised
              name={`${animal.gender}-symbol`}
              type="foundation"
              color={
                animal.gender === 'male' ? THEME_COLORS.MALE_GENDER : THEME_COLORS.FEMALE_GENDER
              }
              containerStyle={styles.share}
              iconStyle={styles.icon}
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
