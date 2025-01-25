import { UserType } from '@animavita/types';
import { signUpValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, FormControl, Stack, useToast } from 'native-base';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';

import AuthHeader from '@/components/auth-header';
import { RHFInput } from '@/components/react-hook-form/native-base';
import useLocale from '@/hooks/use-locale';
import { useNavigation } from '@/navigation/use-navigation';

// making location optional since it's gonna be provided in another screen
const signupSchema = signUpValidationSchema.fork(['location'], (schema) => schema.optional());

type RegisterUserFormProps = {
  defaultValues?: Partial<UserType>;
};

const Form = () => {
  const { t } = useLocale();
  const { navigate } = useNavigation();

  const signupForm = useFormContext();
  const toast = useToast();

  const onConfirm = async (user: UserType) => {
    const isValid = await signupForm.trigger();

    if (!isValid) {
      toast.show({
        description: 'Invalid data!',
      });

      return;
    }

    navigate('GeoLocation', { user });
  };

  return (
    <Stack space={2.5}>
      <RHFInput
        input={{
          placeholder: t('SIGN_UP.FORM.NAME_INPUT'),
          testID: 'signup-form-name-input',
          returnKeyType: 'next',
          isRequired: true,
          autoFocus: true,
        }}
        control={signupForm.control}
        name="name"
        label={t('SIGN_UP.FORM.NAME_INPUT')}
      />

      <RHFInput
        input={{
          placeholder: t('SIGN_UP.FORM.EMAIL_INPUT'),
          testID: 'signup-form-email-input',
          returnKeyType: 'next',
          isRequired: true,
          keyboardType: 'email-address',
          inputMode: 'email',
          autoCapitalize: 'none',
        }}
        control={signupForm.control}
        name="email"
        label={t('SIGN_UP.FORM.EMAIL_INPUT')}
      />

      <RHFInput
        input={{
          placeholder: t('SIGN_UP.FORM.PASSWORD_INPUT'),
          testID: 'signup-form-password-input',
          returnKeyType: 'go',
          isRequired: true,
          type: 'password',
        }}
        control={signupForm.control}
        name="password"
        label={t('SIGN_UP.FORM.PASSWORD_INPUT')}
      />

      <FormControl>
        <Button
          marginTop={6}
          width="full"
          onPress={() => {
            onConfirm(signupForm.getValues() as UserType);
          }}
        >
          {t('SIGN_UP.FORM.SIGN_UP_BUTTON')}
        </Button>
      </FormControl>
    </Stack>
  );
};

export const SignUpForm = ({ defaultValues }: RegisterUserFormProps) => {
  const { t } = useLocale();

  const signupForm = useForm<Partial<UserType>>({
    resolver: joiResolver(signupSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { navigate } = useNavigation();

  return (
    <KeyboardAvoidingView behavior="position">
      <FormProvider {...signupForm}>
        <AuthHeader action={t('SIGN_UP.FORM.SIGN_UP_BUTTON')} _android={{ marginY: 10 }} />

        <Form />
      </FormProvider>
      <Button variant="link" onPress={() => navigate('SignIn')} alignSelf="center">
        {t('SIGN_UP.FORM.SIGN_IN_LINK_BUTTON')}
      </Button>
    </KeyboardAvoidingView>
  );
};
