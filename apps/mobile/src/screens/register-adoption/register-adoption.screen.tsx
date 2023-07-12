import { View } from 'native-base';

import Delimiter from '../../components/delimiter';
import RegisterAdoptionForm from '../../components/register-adoption-form/adoption-form.component';
import AppStatusBar from '../../components/status-bar/status-bar.component';

const RegisterAdoption = () => {
  return (
    <View _web={{ height: 'full' }}>
      <AppStatusBar />
      <Delimiter>
        <RegisterAdoptionForm />
      </Delimiter>
    </View>
  );
};

export default RegisterAdoption;
