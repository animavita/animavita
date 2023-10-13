import { signUpValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, useToast } from 'native-base';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { FormField } from './form-field';
import { UserType } from '../../../../../../shared/types';
import useLocale from '../../../hooks/use-locale';
import Routes from '../../../routes';

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, marginTop: 50 }}
      keyboardVerticalOffset={0}
    >
      <FormProvider {...saveUserForm}>
        <FormControl isInvalid={!!saveUserForm.formState.errors}>
          <FormField
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
    </KeyboardAvoidingView>
  );
};
