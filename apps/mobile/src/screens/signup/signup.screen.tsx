import { View } from 'native-base';

import { SignUpForm } from './compose';

import AppStatusBar from '@/components/status-bar/status-bar.component';

const SignUp = () => {
  return (
    <View flex="1" padding={8}>
      <AppStatusBar />
      <SignUpForm />
    </View>
  );
};

export default SignUp;
