import { PHOTOS_LIMIT } from '@animavita/types';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import useLocale from '../use-locale';

import { ImageState } from '@/hooks/use-pet-form/use-pet-form';
import { uploadMultipleFiles, UploadError } from '@/services/picture-upload';

type UploadPhotosInput = {
  photos: ImageState[];
};

type UploadPhotosResult = {
  urls: string[];
};

export const useUploadPhotos = () => {
  const { t } = useLocale();
  const { setError, setValue, getValues } = useFormContext();

  const getErrorTranslation = (errorCode: string): string => {
    const errorKey = `REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.${errorCode}`;
    const translation = t(errorKey);
    if (translation === errorKey) {
      return t('REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.UNKNOWN_ERROR');
    }
    return translation;
  };

  const mutation = useMutation<UploadPhotosResult, Error, UploadPhotosInput>({
    mutationFn: async ({ photos }) => {
      const imagesToUpload: { uri: string; index: number }[] = [];
      const finalUrls: string[] = new Array(PHOTOS_LIMIT).fill('');

      photos.forEach((img, index) => {
        if (img.uri) {
          if (img.isUploaded) {
            finalUrls[index] = img.uri;
          } else {
            imagesToUpload.push({ uri: img.uri, index });
          }
        }
      });

      if (imagesToUpload.length === 0) {
        return { urls: finalUrls.filter(Boolean) };
      }

      const urisToUpload = imagesToUpload.map((img) => img.uri);
      const { urls, errors } = await uploadMultipleFiles(urisToUpload);

      if (errors.length > 0) {
        const errorWithDetails = new Error('Upload failed') as Error & {
          uploadErrors: UploadError[];
        };
        errorWithDetails.uploadErrors = errors.map((err) => ({
          ...err,
          index: imagesToUpload[err.index].index,
        }));
        throw errorWithDetails;
      }

      urls.forEach((url, uploadIndex) => {
        const originalIndex = imagesToUpload[uploadIndex].index;
        finalUrls[originalIndex] = url;
      });

      return { urls: finalUrls.filter(Boolean) };
    },
    onSuccess: ({ urls }) => {
      const currentPhotos = getValues('photos') as ImageState[];
      const updatedPhotos = currentPhotos.map((photo, index) => {
        const uploadedUrl = urls.find((_, urlIdx) => urlIdx === index);
        if (uploadedUrl && !photo.isUploaded) {
          return { uri: uploadedUrl, isUploaded: true };
        }
        return photo;
      });
      setValue('photos', updatedPhotos, { shouldValidate: true });
    },
    onError: (error) => {
      const errorWithUploadErrors = error as Error & { uploadErrors?: UploadError[] };

      if (errorWithUploadErrors.uploadErrors) {
        errorWithUploadErrors.uploadErrors.forEach((uploadError) => {
          const errorMessage = getErrorTranslation(uploadError.code);
          setError(`photos.${uploadError.index}`, {
            type: 'upload',
            message: errorMessage,
          });
        });
      } else {
        setError('photos', {
          type: 'upload',
          message: getErrorTranslation('NETWORK_ERROR'),
        });
      }
    },
  });

  const uploadPhotos = async (): Promise<string[]> => {
    const photos = getValues('photos') as ImageState[] | undefined;

    if (!photos || photos.length === 0) {
      return [];
    }

    const result = await mutation.mutateAsync({ photos });
    return result.urls;
  };

  return {
    uploadPhotos,
    isUploading: mutation.isPending,
    uploadError: mutation.error,
    resetUploadError: mutation.reset,
  };
};
