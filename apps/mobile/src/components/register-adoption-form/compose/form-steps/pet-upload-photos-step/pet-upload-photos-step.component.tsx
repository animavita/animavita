import { Center, Container, Image, Pressable, View } from 'native-base';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';
import { PhotoPickerProps } from './pet-upload-photos-step.types';
import imagePickerUtil from '../../../../../shared/image-picker';
import theme from '../../../../../theme';
import i18next from 'i18next';

const checkForCameraRollPermission = async () => {
  const status = await imagePickerUtil.getPermissionStatus();

  if (status !== 'granted') alert(i18next.t('PERMISSIONS.CAMERA'));
  else console.info('Media Permissions are granted');
};

const PhotoPicker = ({ imageUri, small, onPress, ...props }: PhotoPickerProps) => {
  const size = small ? 100 : 220;

  return (
    <Pressable onPress={onPress}>
      {imageUri ? (
        <Image rounded="md" source={{ uri: imageUri }} width={size} height={size} {...props} />
      ) : (
        <Center
          rounded="md"
          backgroundColor={theme.colors.gray[300]}
          width={size}
          height={size}
          {...props}
        >
          <Icon name="camera" color={theme.colors.white} size={size / 2.5} />
        </Center>
      )}
    </Pressable>
  );
};

const PetUploadPhotosStep = () => {
  const { images, pickImage } = usePetPhotosPicker();

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  return (
    <View>
      <Center flexDirection="row">
        <PhotoPicker imageUri={images[0]} onPress={pickImage(0)} alt="Photo 1" testID="Photo 1" />
        <Container flexDirection="column">
          <PhotoPicker
            imageUri={images[1]}
            small
            marginLeft="4"
            marginBottom="3"
            alt="Photo 2"
            testID="Photo 2"
            onPress={pickImage(1)}
          />
          <PhotoPicker
            imageUri={images[2]}
            small
            marginLeft="4"
            marginTop="1.5"
            alt="Photo 3"
            testID="Photo 3"
            onPress={pickImage(2)}
          />
        </Container>
      </Center>
    </View>
  );
};

export default PetUploadPhotosStep;
