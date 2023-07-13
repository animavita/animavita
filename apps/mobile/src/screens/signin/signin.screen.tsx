import { useNavigation } from '@react-navigation/native';
import { Button, Heading, Input, Text, View } from 'native-base';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

<<<<<<< HEAD
import AppStatusBar from '../../components/status-bar/status-bar.component';
import { useAuth } from '../../hooks/use-auth-provider';
import useLocale from '../../hooks/use-locale';
=======
import Routes from '../../routes';
import AppStatusBar from '../../shared/components/status-bar/status-bar.component';
import { useAuth } from '../../shared/hooks/use-auth-provider';
import useLocale from '../../shared/hooks/use-locale';
import theme from '../../theme';
>>>>>>> 688407f (update sign in screen styles)

const SignInScreen = () => {
  const auth = useAuth();
  const { t } = useLocale();

  const { navigate } = useNavigation();

  return (
    <View flex="1" padding={8}>
      <AppStatusBar />
<<<<<<< HEAD
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
=======
      <KeyboardAvoidingView>
        <View marginY={20}>
          <Heading fontSize="4xl" color={theme.colors.primary[600]}>
            Animavita
          </Heading>
          <Text fontSize="2xl">Sign In</Text>
        </View>
        <FormRow>
          <Text color={theme.colors.gray[500]} marginBottom={2}>
            {t('SIGN_IN.FORM.EMAIL_INPUT')}
          </Text>
          <Input placeholder={t('SIGN_IN.FORM.EMAIL_INPUT')} type="text" />
        </FormRow>
        <FormRow>
          <Text color={theme.colors.gray[500]} marginBottom={2}>
            {t('SIGN_IN.FORM.PASSWORD_INPUT')}
          </Text>

          <Input placeholder={t('SIGN_IN.FORM.PASSWORD_INPUT')} type="password" />
        </FormRow>
        <Button
          marginTop={10}
          width="full"
          onPress={() => {
            auth.signIn({
              accessToken: '1234',
              refreshToken: '4321',
            });

            navigate(Routes.GetLocation as never);
          }}
        >
          {t('SIGN_IN.FORM.LOGIN_BUTTON')}
        </Button>
      </KeyboardAvoidingView>
>>>>>>> 688407f (update sign in screen styles)
    </View>
  );
};

type FormRowProps = {
  children: React.ReactNode;
};

const FormRow = ({ children }: FormRowProps) => {
  return <View marginY={2}>{children}</View>;
};

export default SignInScreen;
