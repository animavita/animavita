import { Button, View } from 'native-base';

import AppStatusBar from '../../shared/components/status-bar/status-bar.component';
import { useAuth } from '../../shared/hooks/use-auth-provider';

const SignInScreen = () => {
  const auth = useAuth();

  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <AppStatusBar />
      <Button
        variant="outline"
        onPress={() => {
          auth.signIn({
            accessToken: '1234',
            refreshToken: '4321',
          });
        }}
      >
        Entrar
      </Button>
    </View>
  );
};

export default SignInScreen;
