import { View } from 'native-base';

import RegisterAdoptionForm from '../../components/register-adoption-form/adoption-form.component';
import AppStatusBar from '../../shared/components/status-bar/status-bar.component';

export default function RegisterAdoption() {
  return (
    <View _web={{ height: 'full' }}>
      <AppStatusBar />
      <RegisterAdoptionForm />
    </View>
  );
}
