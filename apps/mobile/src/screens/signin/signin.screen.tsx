import { View } from 'native-base';

import { SignInForm } from './compose';

import AppStatusBar from '@/components/status-bar/status-bar.component';

const SignInScreen = () => {
  return (
    <View flex="1" padding={8}>
      <AppStatusBar />
      <SignInForm />
    </View>
  );
};

export default SignInScreen;
