import { View } from 'native-base';
import React from 'react';

<<<<<<< HEAD
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
=======
import { SignInForm } from './compose';
import AppStatusBar from '../../shared/components/status-bar/status-bar.component';
>>>>>>> ce5498e (add compose folder with the components to build sign-in screen)

const SignInScreen = () => {
  return (
    <View flex="1" padding={8}>
      <AppStatusBar />
<<<<<<< HEAD
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
          <Text fontSize="2xl">{t('SIGN_IN.FORM.LOGIN_BUTTON')}</Text>
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
=======
      <SignInForm />
>>>>>>> ce5498e (add compose folder with the components to build sign-in screen)
    </View>
  );
};

export default SignInScreen;
