import { Button, View } from 'native-base';

import AppStatusBar from '../../shared/components/status-bar/status-bar.component';
import { useAuth } from '../../shared/hooks/use-auth-provider';
import useLocale from '../../shared/hooks/use-locale';

const SignInScreen = () => {
  const auth = useAuth();
  const { t } = useLocale();

  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <AppStatusBar />
      <Button
        variant="outline"
        onPress={() => {
          auth.signIn({
            accessToken: '1234',
            refreshToken: '4321',
            name: 'Gabriel Belgamo',
          });
        }}
      >
        {t('SIGN_IN.FORM.LOGIN_BUTTON')}
      </Button>
    </View>
  );
};

export default SignInScreen;
