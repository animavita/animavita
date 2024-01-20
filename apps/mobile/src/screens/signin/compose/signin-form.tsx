import { SignInRequest, UserType } from '@animavita/types';
import { signInValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Spinner,
  Stack,
  Text,
  useToast,
} from 'native-base';
import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { FormRow } from './form-row';

import AuthHeader from '@/components/auth-header';
import { RHFInput } from '@/components/react-hook-form/native-base';
import useLocale from '@/hooks/use-locale';
import useUserSignIn from '@/hooks/use-user-signin';
import Routes from '@/routes';
import theme from '@/theme';

type SignInUserFormProps = {
  defaultValues?: Partial<UserType>;
};

export const Form = () => {
  const { t } = useLocale();
  const { signIn, isSigningIn, error } = useUserSignIn();
  const toast = useToast();

  const signinForm = useFormContext();

  const { navigate } = useNavigation();

  useEffect(() => {
    if (error) toast.show({ title: error, variant: 'solid' });
  }, [error]);

  const onSignIn = async () => {
    const isValid = await signinForm.trigger();

    if (!isValid) {
      toast.show({
        description: 'Invalid data!',
      });

      return;
    }

    const values = signinForm.getValues();

    signIn(values.email, values.password);
  };

  return (
    <>
      <Stack space={2.5}>
        <RHFInput
          input={{
            placeholder: t('SIGN_IN.FORM.EMAIL_INPUT'),
            testID: 'signin-form-email-input',
            returnKeyType: 'next',
            isRequired: true,
            keyboardType: 'email-address',
            inputMode: 'email',
            autoCapitalize: 'none',
            autoFocus: true,
          }}
          control={signinForm.control}
          name="email"
          label={t('SIGN_IN.FORM.EMAIL_INPUT')}
        />

        <RHFInput
          input={{
            placeholder: t('SIGN_IN.FORM.PASSWORD_INPUT'),
            testID: 'signin-form-password-input',
            returnKeyType: 'go',
            isRequired: true,
            type: 'password',
          }}
          control={signinForm.control}
          name="password"
          label={t('SIGN_IN.FORM.PASSWORD_INPUT')}
        />

        <FormControl>
          <Button marginTop={5} width="full" onPress={() => onSignIn()} disabled={isSigningIn}>
            {t('SIGN_IN.FORM.LOGIN_BUTTON')}
          </Button>
        </FormControl>
      </Stack>

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
    </>
  );
};

export const SignInForm = ({ defaultValues }: SignInUserFormProps) => {
  const { t } = useLocale();

  const signupForm = useForm<SignInRequest>({
    resolver: joiResolver(signInValidationSchema),
    mode: 'onChange',
    defaultValues,
  });

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
      <FormProvider {...signupForm}>
        <AuthHeader action={t('SIGN_IN.FORM.LOGIN_BUTTON')} _android={{ marginY: 10 }} />

        <Form />
      </FormProvider>
    </KeyboardAvoidingView>
  );
};
