import { useNavigation } from '@react-navigation/native';
import { Button, Input, KeyboardAvoidingView, Spinner, Text, useToast } from 'native-base';
import { useEffect, useState } from 'react';

import { FormRow } from './form-row';

import AuthHeader from '@/components/auth-header';
import useLocale from '@/hooks/use-locale';
import useUserSignIn from '@/hooks/use-user-signin';
import Routes from '@/routes';
import theme from '@/theme';

export const SignInForm = () => {
  const { t } = useLocale();
  const { signIn, isSigningIn, error } = useUserSignIn();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { navigate } = useNavigation();

  useEffect(() => {
    if (error) toast.show({ title: error, variant: 'solid' });
  }, [error]);

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
      <AuthHeader action={t('SIGN_IN.FORM.LOGIN_BUTTON')} />
      <FormRow>
        <Text color={theme.colors.gray[500]} marginBottom={2}>
          {t('SIGN_IN.FORM.EMAIL_INPUT')}
        </Text>
        <Input
          size="xl"
          placeholder={t('SIGN_IN.FORM.EMAIL_INPUT')}
          type="text"
          inputMode="email"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
        />
      </FormRow>
      <FormRow>
        <Text color={theme.colors.gray[500]} marginBottom={2}>
          {t('SIGN_IN.FORM.PASSWORD_INPUT')}
        </Text>

        <Input
          size="xl"
          placeholder={t('SIGN_IN.FORM.PASSWORD_INPUT')}
          type="password"
          onChangeText={(value) => setPassword(value)}
        />
      </FormRow>

      <Button
        marginTop={5}
        width="full"
        onPress={() => signIn(email, password)}
        disabled={isSigningIn}
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

      {isSigningIn && <Spinner />}
    </KeyboardAvoidingView>
  );
};
