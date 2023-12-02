import { signUpValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, useToast } from 'native-base';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';

import { FormField } from './form-field';
import { UserType } from '../../../../../../shared/types';
import useLocale from '../../../hooks/use-locale';
import Routes from '../../../routes';

import AuthHeader from '@/components/auth-header';

type RegisterUserFormProps = {
  defaultValues?: Partial<UserType>;
};

export const SignUpForm = ({ defaultValues }: RegisterUserFormProps) => {
  const { t } = useLocale();

  const saveUserForm = useForm<Partial<UserType>>({
    resolver: joiResolver(signUpValidationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const toast = useToast();

  const { navigate } = useNavigation();

  const onConfirm = async (user: UserType) => {
    const isValid = await saveUserForm.trigger();

    if (!isValid) {
      toast.show({
        description: `Invalid data`,
      });

      return;
    }

    navigate(Routes.GetLocation as never, { user });
  };

  const isInvalid = !!Object.keys(saveUserForm.formState.errors).length;

  return (
    <KeyboardAvoidingView behavior="position">
      <FormProvider {...saveUserForm}>
        <AuthHeader action={t('SIGN_UP.FORM.SIGN_UP_BUTTON')} _android={{ marginY: 10 }} />
        <FormControl isInvalid={isInvalid}>
          <FormField
            autoFocus
            label={t('SIGN_UP.FORM.NAME_INPUT')}
            name="name"
            placeholder={t('SIGN_UP.FORM.NAME_INPUT')}
          />
          <FormField
            label={t('SIGN_UP.FORM.EMAIL_INPUT')}
            name="email"
            placeholder={t('SIGN_UP.FORM.EMAIL_INPUT')}
          />
          <FormField
            type="password"
            label={t('SIGN_UP.FORM.PASSWORD_INPUT')}
            name="password"
            placeholder={t('SIGN_UP.FORM.PASSWORD_INPUT')}
          />
          <Button
            marginTop={6}
            width="full"
            onPress={() => {
              onConfirm(saveUserForm.getValues() as UserType);
            }}
          >
            {t('SIGN_UP.FORM.SIGN_UP_BUTTON')}
          </Button>
        </FormControl>
      </FormProvider>
      <Button variant="link" onPress={() => navigate(Routes.SignIn as never)} alignSelf="center">
        {t('SIGN_UP.FORM.SIGN_IN_LINK_BUTTON')}
      </Button>
    </KeyboardAvoidingView>
  );
};
