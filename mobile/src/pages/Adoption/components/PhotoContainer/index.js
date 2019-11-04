import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Title } from '~/components';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import usePhoto from '~/hooks/usePhoto';
import { showMessage } from 'react-native-flash-message';
import {
  BackButton, Footer, Container, Box, Photo, PhotoSource, DrawImage, Wrapper, styles,
} from './styles';
import GradientButton from '~/components/GradientButton';

const ADOPT_REGISTER_MUTATION = gql`
  mutation AdoptRegisterMutation($name: String!,
  $breed: String!, $gender: Gender!, $type: Type!, $age: Int!, $size: Size!, $observations: String! $images: [Upload]!) {
    AdoptRegisterMutation(input: { name: $name, breed: $breed, gender: $gender, type: $type , age: $age, size: $size, observations: $observations, images: $images}) {
      adopt {
        images
      }
    }
  }
`;


const PhotoContainer = ({
  setStep, data, navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [photos, handleSelectImage, removeImage] = usePhoto();
  const [registerAdopt] = useMutation(ADOPT_REGISTER_MUTATION, {
    onCompleted: () => {
      showMessage({
        message: 'Salvo com sucesso!',
        description: `Os dados dessa adoção foram salvos com sucesso, você receberá uma notificação quando solicitarem a a doção de ${data.name}!`,
        type: 'success',
        duration: 4000,
      });
      setLoading(false);
      navigation.goBack();
    },
  });


  function submitAdopt() {
    setLoading(true);
    const images = photos.filter(item => item.image);
    if (images.length > 0) {
      registerAdopt({
        variables: {
          ...data,
          gender: data.gender.toUpperCase(),
          type: data.type.toUpperCase(),
          size: data.size.toUpperCase(),
          images,
        },
      });
    } else {
      setLoading(false);
      showMessage({
        message: 'Nenhuma imagem enviada!',
        description: `Por favor, adicione pelo menos uma foto do ${data.name}`,
        type: 'danger',
      });
    }
  }

  return (
    <Container>
      <DrawImage source={require('~/images/photoContainerImage.jpg')} />
      <Title size={12} weight="normal">
        Que tal umas fotos fofíssimas do {data.name}?
      </Title>
      <Box>
        {photos.map(item => (!item.save ? (
          <Photo key={item.order} onPress={() => handleSelectImage(item.order)}>
            <Icon name="camera" type="feather" color={THEME_COLORS.SECONDARY} />
          </Photo>
        ) : (
          <Wrapper key={item.order}>
            <TouchableOpacity
              hitSlop={{
                top: 20, bottom: 20, left: 20, right: 20,
              }}
              onPress={() => removeImage(item.order)}
            >
              <Icon
                name="ios-close-circle"
                type="ionicon"
                color="red"
                reverseColor="white"
                iconStyle={styles.exclude}
              />
            </TouchableOpacity>
            <PhotoSource source={photos[item.order].preview} />
          </Wrapper>
        )))}
      </Box>
      <Footer>
        <GradientButton
          disabled={loading}
          onPress={() => submitAdopt()}
          loading={loading}
        >
          <Title size={14} color="white">
            Finalizar
          </Title>
        </GradientButton>
        <BackButton
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 30,
            right: 30,
          }}
          onPress={() => setStep(0)}
        >
          <Title size={12} color={THEME_COLORS.GREY} weight="normal">
            Voltar para os detalhes
          </Title>
        </BackButton>
      </Footer>
    </Container>
  );
};

PhotoContainer.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    observations: PropTypes.string,
    animal: PropTypes.string,
    sex: PropTypes.string,
    age: PropTypes.number,
    size: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  setStep: PropTypes.func.isRequired,
};

export default PhotoContainer;
