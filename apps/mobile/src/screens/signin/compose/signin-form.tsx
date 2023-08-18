import { useNavigation } from '@react-navigation/native';
import { Button, Heading, Input, KeyboardAvoidingView, Text, View } from 'native-base';

import { FormRow } from './form-row';
import { useAuth } from '../../../hooks/use-auth-provider';
import useLocale from '../../../hooks/use-locale';
import Routes from '../../../routes';
import theme from '../../../theme';

export const SignInForm = () => {
  const { t } = useLocale();
  const auth = useAuth();
  const { navigate } = useNavigation();

  return (
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
            name: 'John Doe',
          });

          navigate(Routes.GetLocation as never);
        }}
      >
        {t('SIGN_IN.FORM.LOGIN_BUTTON')}
      </Button>
    </KeyboardAvoidingView>
  );
};
