import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import { MAX_FILE_SIZE } from '~/utils/constants';

const usePhoto = () => {
  const [photos, setPhoto] = useState([{ order: 0 }, { order: 1 }, { order: 2 }]);

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
            description: 'Ops! Algum erro aconteceu ao fazer upload desta imagem!',
            type: 'danger',
          });
        } else if (upload.didCancel) {
          showMessage({
            message: 'Você cancelou a ação de upload de imagem!',
            description: 'Ops! Parece que temos alguém indeciso.',
            type: 'danger',
          });
        } else {
          if (upload.fileSize > MAX_FILE_SIZE) {
            return showMessage({
              message: 'A imagem que você está tentando subir é muito pesada!',
              description:
                'Ops! Só precisamos de algumas imagens simples que mostre a fofura para o mundo, não precisa exagerar',
              type: 'danger',
            });
          }

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

          setPhoto(newArrayPhotos);
        }
        return photos;
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
    setPhoto(resetPhotos);
  }

  return [photos, handleSelectImage, removeImage];
};

export default usePhoto;
