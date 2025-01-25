import { useState } from 'react';

import { UsePetPhotosPickerHook } from './pet-upload-photos-step.types';

import imagePickerUtil from '@/shared/image-picker';

const PHOTOS_LIMIT = 3;

export const usePetPhotosPicker = (): UsePetPhotosPickerHook => {
  const [images, setImages] = useState<string[]>(new Array(PHOTOS_LIMIT));

  const updateImages = (imageIndex: number, uri: string) => {
    const updateImages = [...images];
    updateImages[imageIndex] = uri;

    setImages(updateImages);
  };

  const pickImage = (imageIndex: number) => async () => {
    const imageUri = await imagePickerUtil.openImageLibrary();

    if (imageUri) updateImages(imageIndex, imageUri);
  };

  return { images, pickImage };
};
