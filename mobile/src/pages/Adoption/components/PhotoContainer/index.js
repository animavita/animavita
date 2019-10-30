import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { Title } from '~/components';
import ImagePicker from 'react-native-image-picker';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import {
  BackButton, Footer, Container, Box, Photo, PhotoSource, DrawImage, Wrapper, styles,
} from './styles';
import GradientButton from '~/components/GradientButton';

const PhotoContainer = ({ setStep, data, setData }) => {
  const [photos, usePhoto] = useState([{ order: 0 }, { order: 1 }, { order: 2 }]);
  function handleSelectImage(index) {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar Imagem',
        takePhotoButtonTitle: 'Tirar foto...',
        chooseFromLibraryButtonTitle: 'Escolher da galeria...',
      },
      (upload) => {
        if (upload.error) {
          showMessage({
            message: 'Erro ao fazer upload de imagem!',
            description:
              'Ops! Algum erro aconteceu ao fazer upload desta imagem!',
            type: 'danger',
          });
        } else if (upload.didCancel) {
          showMessage({
            message: 'Você cancelou a ação de upload de imagem!',
            description:
              'Ops! Parece que temos alguém indeciso.',
            type: 'danger',
          });
        } else {
          const preview = {
            uri: `data:image/jpeg;base64, ${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.filename) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLocaleLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          const newArrayPhotos = [...photos];

          newArrayPhotos[index] = {
            preview,
            image,
            save: true,
            order: index,
          };

          usePhoto(newArrayPhotos);
        }
      },
    );
  }

  function removeImage(index) {
    const resetPhotos = photos.map((photo) => {
      if (photo.order === index) {
        return {
          order: index,
        };
      }

      return photo;
    });
    usePhoto(resetPhotos);
  }

  function backStep() {
    setData(data);
    setStep(0);
  }

  return (
    <>
      <Container>
        <DrawImage source={require('~/images/photoContainerImage.jpg')} />
        <Title size={12} weight="normal">
          Que tal umas fotos fofíssimas do animalzíneo?
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
      </Container>
      <Footer>
        <GradientButton disabled={false} onPress={() => alert(JSON.stringify(data))}>
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
          onPress={() => backStep()}
        >
          <Title size={12} color={THEME_COLORS.GREY} weight="normal">
            Voltar para os detalhes
          </Title>
        </BackButton>
      </Footer>
    </>
  );
};

PhotoContainer.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    observations: PropTypes.string,
    animal: PropTypes.string,
    sex: PropTypes.string,
    age: PropTypes.number,
    size: PropTypes.string,
  }).isRequired,
  setStep: PropTypes.func.isRequired,
};

export default PhotoContainer;
