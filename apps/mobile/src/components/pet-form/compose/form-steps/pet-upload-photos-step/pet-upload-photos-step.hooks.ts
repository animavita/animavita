import { useToast } from 'native-base';
import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useLocale from '@/hooks/use-locale';
import { getInitialPhotos, ImageState } from '@/hooks/use-pet-form/use-pet-form';
import { validateFile } from '@/services/picture-upload';
import imagePickerUtil from '@/shared/image-picker';

type PhotosFormState = {
  photos?: ImageState[];
};

export const usePetPhotosPicker = () => {
  const { t } = useLocale();
  const toast = useToast();
  const { setValue, control } = useFormContext<PhotosFormState>();
  const photos = useWatch({ control, name: 'photos' }) ?? getInitialPhotos();

  const getErrorTranslation = useCallback(
    (errorCode: string) => {
      const errorKey = `REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.${errorCode}`;
      const translation = t(errorKey);
      if (translation === errorKey) {
        return t('REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.UNKNOWN_ERROR');
      }
      return translation;
    },
    [t]
  );

  const getPhotoError = (index: number) => {
    return photos[index]?.error;
  };

  const pickImage = useCallback(
    (imageIndex: number) => async () => {
      const imageUri = await imagePickerUtil.openImageLibrary();

      if (!imageUri) return;

      const validation = await validateFile(imageUri);

      if (!validation.valid) {
        const errorMessage = getErrorTranslation(validation.error || 'UNKNOWN_ERROR');
        toast.show({ description: errorMessage });

        const newPhotos = [...photos];
        newPhotos[imageIndex] = { uri: imageUri, isUploaded: false, error: errorMessage };
        setValue('photos', newPhotos, { shouldValidate: false });
        return;
      }

      const newPhotos = [...photos];
      newPhotos[imageIndex] = { uri: imageUri, isUploaded: false };
      setValue('photos', newPhotos, { shouldValidate: true });
    },
    [photos, setValue, getErrorTranslation, toast]
  );

  return {
    photos,
    pickImage,
    getPhotoError,
  };
};
