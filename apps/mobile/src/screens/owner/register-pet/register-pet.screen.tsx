import { View } from 'native-base';

import PetForm from '@/components/pet-form/pet-form.component';
import SafeArea from '@/components/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';

const RegisterPet = () => {
  return (
    <View height="full">
      <SafeArea>
        <AppStatusBar />
        <PetForm />
      </SafeArea>
    </View>
  );
};

export default RegisterPet;
