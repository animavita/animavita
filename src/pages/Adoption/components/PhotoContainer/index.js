import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Title } from '~/components';
import ImagePicker from 'react-native-image-picker';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import {
  Container, Box, Photo, PhotoSource, DrawImage,
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
          console.log('Error');
        } else if (upload.didCancel) {
          console.log('Used canceled');
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
            preview, image, save: true, order: index,
          };

          usePhoto(newArrayPhotos);
        }
      },
    );
  }

  function backStep() {
    setData(data);
    setStep(0);
  }


  return (
    <>
      <Container>
        <DrawImage source={require('~/images/playCat.png')} />
        <Title size={12} weight="normal">Que tal umas fotos fofíssimas do animalzíneo?</Title>
        <Box>
          {photos.map(item => (!item.save ? (
            <Photo key={item.order} onPress={() => handleSelectImage(item.order)}>
              <Icon name="camera" type="feather" color={THEME_COLORS.SECONDARY} />
            </Photo>
          ) : <PhotoSource key={item.order} source={photos[item.order].preview} />))}
        </Box>
      </Container>
      <GradientButton disabled={false} onPress={() => backStep()}>
        <Title size={14} color="white">
          Finalizar
        </Title>
      </GradientButton>
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
