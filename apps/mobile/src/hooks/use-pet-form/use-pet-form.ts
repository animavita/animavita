import { PHOTOS_LIMIT } from '@animavita/types/dtos';
import { adoptionValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

export type ImageState = {
  uri: string;
  isUploaded: boolean;
  error?: string;
};

export type PetFormValues = {
  id?: string;
  name: string;
  gender: 'male' | 'female';
  breed: string;
  type: 'dog' | 'cat' | 'other';
  maturity: 'puppy' | 'young' | 'adult' | 'senior';
  size: 'small' | 'medium' | 'big';
  observations: string;
  photos: ImageState[];
};

export const validationSchema = adoptionValidationSchema.fork(
  ['name', 'gender', 'breed', 'type', 'maturity', 'size', 'photos'],
  (schema) => schema.required()
);

export const usePetForm = (defaultValues?: Partial<PetFormValues>) => {
  const transformedDefaults: Partial<PetFormValues> | undefined = defaultValues
    ? {
        ...defaultValues,
        photos: urlsToImageStates(
          defaultValues.photos?.map((p) => (typeof p === 'string' ? p : p.uri))
        ),
      }
    : undefined;

  return useForm<Partial<PetFormValues>>({
    resolver: joiResolver(validationSchema),
    mode: 'onChange',
    defaultValues: transformedDefaults,
  });
};

const isUploadedUrl = (uri: string): boolean => uri.startsWith('http');

const createEmptyImageState = (): ImageState => ({
  uri: '',
  isUploaded: false,
});

export const getInitialPhotos = (): ImageState[] =>
  Array.from({ length: PHOTOS_LIMIT }, createEmptyImageState);

export const urlsToImageStates = (urls?: string[]): ImageState[] => {
  const photos = getInitialPhotos();

  urls?.slice(0, PHOTOS_LIMIT).forEach((uri, index) => {
    if (uri) {
      photos[index] = { uri, isUploaded: isUploadedUrl(uri) };
    }
  });

  return photos;
};
