import { MIN_PHOTOS_REQUIRED } from '@animavita/types';
import { Center, Container, Image, Pressable, View, Text, Box } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';
import { PhotoPickerProps } from './pet-upload-photos-step.types';

import useLocale from '@/hooks/use-locale';
import theme from '@/theme';

const IMAGE_SIZES = { SMALL: 100, LARGE: 220 };

const PhotoPicker = ({
  imageUri,
  small,
  onPress,
  hasError,
  alt,
  accessibilityHint,
  ...boxProps
}: PhotoPickerProps) => {
  const size = small ? IMAGE_SIZES.SMALL : IMAGE_SIZES.LARGE;
  const borderColor = hasError ? theme.colors.red[500] : 'transparent';
  const borderWidth = hasError ? 3 : 0;

  return (
    <Box {...boxProps}>
      <Pressable onPress={onPress} accessibilityHint={accessibilityHint}>
        {imageUri ? (
          <Image
            rounded="md"
            source={{ uri: imageUri }}
            width={size}
            height={size}
            borderColor={borderColor}
            borderWidth={borderWidth}
            alt={alt || 'Pet photo'}
          />
        ) : (
          <Center
            rounded="md"
            backgroundColor={hasError ? theme.colors.red[100] : theme.colors.gray[300]}
            borderColor={borderColor}
            borderWidth={borderWidth}
            width={size}
            height={size}
          >
            <Icon
              name="camera"
              color={hasError ? theme.colors.red[500] : theme.colors.white}
              size={size / 2.5}
            />
          </Center>
        )}
      </Pressable>
    </Box>
  );
};

const PetUploadPhotosStep = () => {
  const { t } = useLocale();
  const { photos, pickImage, getPhotoError } = usePetPhotosPicker();

  const [firstPhoto, secondPhoto, thirdPhoto] = photos;

  const validPhotosCount = photos.filter(
    (photo, index) => photo.uri && !getPhotoError(index)
  ).length;
  const hasMinimumPhotos = validPhotosCount >= MIN_PHOTOS_REQUIRED;

  return (
    <View>
      <Center flexDirection="row">
        <PhotoPicker
          imageUri={firstPhoto?.uri}
          hasError={!!getPhotoError(0)}
          alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_ONE')}
          accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_ONE')}
          onPress={pickImage(0)}
        />
        <Container flexDirection="column">
          <PhotoPicker
            imageUri={secondPhoto?.uri}
            hasError={!!getPhotoError(1)}
            small
            marginLeft="4"
            marginBottom="3"
            alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_TWO')}
            accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_TWO')}
            onPress={pickImage(1)}
          />
          <PhotoPicker
            imageUri={thirdPhoto?.uri}
            hasError={!!getPhotoError(2)}
            small
            marginLeft="4"
            marginTop="1.5"
            alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_THREE')}
            accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_THREE')}
            onPress={pickImage(2)}
          />
        </Container>
      </Center>
      {!hasMinimumPhotos && (
        <Text textAlign="center" marginTop="4" color={theme.colors.gray[500]} fontSize="sm">
          {t('REGISTER_ADOPTION.FORM.PHOTOS.MIN_PHOTOS_REQUIRED')}
        </Text>
      )}
    </View>
  );
};

export default PetUploadPhotosStep;
