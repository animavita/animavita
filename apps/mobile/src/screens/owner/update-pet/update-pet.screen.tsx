import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'native-base';

import PetForm from '@/components/pet-form/pet-form.component';
import SafeArea from '@/components/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';
import type { StackParamsList } from '@/navigation/main-navigator';

type UpdatePetScreenProps = NativeStackScreenProps<StackParamsList, 'UpdatePet'>;

const UpdatePetScreen = ({ route }: UpdatePetScreenProps) => {
  return (
    <View height="full">
      <SafeArea>
        <AppStatusBar />
        <PetForm defaultValues={route.params.pet} />
      </SafeArea>
    </View>
  );
};

export default UpdatePetScreen;
