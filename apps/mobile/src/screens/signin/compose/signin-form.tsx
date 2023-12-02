import { useNavigation } from '@react-navigation/native';
import { Button, Input, KeyboardAvoidingView, Text } from 'native-base';

import { FormRow } from './form-row';

import AuthHeader from '@/components/auth-header';
import { useAuth } from '@/hooks/use-auth-provider';
import useLocale from '@/hooks/use-locale';
import Routes from '@/routes';
import theme from '@/theme';

export const SignInForm = () => {
  const { t } = useLocale();
  const auth = useAuth();

  const { navigate } = useNavigation();

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
      <AuthHeader action={t('SIGN_IN.FORM.LOGIN_BUTTON')} />
      <FormRow>
        <Text color={theme.colors.gray[500]} marginBottom={2}>
          {t('SIGN_IN.FORM.EMAIL_INPUT')}
        </Text>
        <Input size="xl" placeholder={t('SIGN_IN.FORM.EMAIL_INPUT')} type="text" />
      </FormRow>
      <FormRow>
        <Text color={theme.colors.gray[500]} marginBottom={2}>
          {t('SIGN_IN.FORM.PASSWORD_INPUT')}
        </Text>

        <Input size="xl" placeholder={t('SIGN_IN.FORM.PASSWORD_INPUT')} type="password" />
      </FormRow>

      <Button
        marginTop={5}
        width="full"
        onPress={() => {
          auth.signIn({
            accessToken: '1234',
            refreshToken: '4321',
            name: 'John Doe',
          });
        }}
      >
        {t('SIGN_IN.FORM.LOGIN_BUTTON')}
      </Button>
      <Button
        variant="link"
        onPress={() => {
          navigate(Routes.SignUp as never);
        }}
        alignSelf="center"
      >
        {t('SIGN_IN.FORM.SIGN_UP_LINK')}
      </Button>
    </KeyboardAvoidingView>
  );
};
