import { Center, Container, Image, Pressable, View } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';
import { PhotoPickerProps } from './pet-upload-photos-step.types';

import useLocale from '@/hooks/use-locale';
import theme from '@/theme';

const IMAGE_SIZES = { SMALL: 100, LARGE: 220 };

const PhotoPicker = ({ imageUri, small, onPress, ...props }: PhotoPickerProps) => {
  const size = small ? IMAGE_SIZES.SMALL : IMAGE_SIZES.LARGE;

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
  const { t } = useLocale();
  const { images, pickImage } = usePetPhotosPicker();

  const [firstImage, secondImage, thirdImage] = images;

  return (
    <View>
      <Center flexDirection="row">
        <PhotoPicker
          imageUri={firstImage}
          alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_ONE')}
          accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_ONE')}
          onPress={pickImage(0)}
        />
        <Container flexDirection="column">
          <PhotoPicker
            imageUri={secondImage}
            small
            marginLeft="4"
            marginBottom="3"
            alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_TWO')}
            accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_TWO')}
            onPress={pickImage(1)}
          />
          <PhotoPicker
            imageUri={thirdImage}
            small
            marginLeft="4"
            marginTop="1.5"
            alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_THREE')}
            accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_THREE')}
            onPress={pickImage(2)}
          />
        </Container>
      </Center>
    </View>
  );
};

export default PetUploadPhotosStep;
