import { View } from 'native-base';

import RegisterAdoptionForm from '../../components/register-adoption-form/adoption-form.component';
import SafeArea from '../../components/safe-area';
import AppStatusBar from '../../components/status-bar/status-bar.component';

const RegisterAdoption = () => {
  return (
    <View height="full">
      <SafeArea>
        <AppStatusBar />
        <RegisterAdoptionForm />
      </SafeArea>
    </View>
  );
};

export default RegisterAdoption;
