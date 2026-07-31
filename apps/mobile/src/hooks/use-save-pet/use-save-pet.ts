import { AdoptionType } from '@animavita/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';

import useLocale from '../use-locale';
import { useUploadPhotos } from '../use-upload-photos';

import { PetFormValues } from '@/hooks/use-pet-form/use-pet-form';
import { useNavigation } from '@/navigation/use-navigation';
import { saveOrCreate } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';

export const useSavePet = () => {
  const { t } = useLocale();
  const navigation = useNavigation();
  const toast = useToast();
  const client = useQueryClient();
  const { uploadPhotos, isUploading, uploadProgress } = useUploadPhotos();

  const mutation = useMutation({
    mutationFn: saveOrCreate,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.getMyPets] });
      navigation.navigate('Home');
    },
    onError: () => {
      toast.show({ description: t('REGISTER_ADOPTION.FORM_ERROR_MESSAGES.GENERIC_ERROR') });
    },
  });

  const saveOrCreatePet = async (formValues: Partial<PetFormValues>): Promise<boolean> => {
    const photoUrls = await uploadPhotos();

    if (photoUrls.length === 0) {
      return false;
    }

    const pet: Partial<AdoptionType> = {
      ...formValues,
      photos: photoUrls,
    };

    await mutation.mutateAsync(pet);
    return true;
  };

  return {
    saving: mutation.isPending || isUploading,
    uploadProgress: isUploading ? uploadProgress : null,
    saveOrCreatePet,
  };
};
