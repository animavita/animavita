import { View } from 'native-base';

import PetForm from '@/components/pet-form/pet-form.component';
import SafeArea from '@/components/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';
import useLocale from '@/hooks/use-locale';

const RegisterPet = () => {
  const { t } = useLocale();

  return (
    <View height="full">
      <SafeArea>
        <AppStatusBar />
        <PetForm title={t('REGISTER_ADOPTION.TITLE')} />
      </SafeArea>
    </View>
  );
};

export default RegisterPet;
