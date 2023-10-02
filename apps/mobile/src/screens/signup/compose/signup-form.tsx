import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigation } from '@react-navigation/native';
import Joi from 'joi';
import { Button, FormControl, useToast } from 'native-base';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { FormField } from './form-field';
import { UserType } from '../../../../../../shared/types';
import { useSignUp } from '../../../hooks/use-onboarding-provider';
import Routes from '../../../routes';

type RegisterUserFormProps = {
  defaultValues?: Partial<UserType>;
};

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});

export const SignUpForm = ({ defaultValues }: RegisterUserFormProps) => {
  const saveUserForm = useForm<Partial<UserType>>({
    resolver: joiResolver(createUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const toast = useToast();

  const { navigate } = useNavigation();
  const { updateUserInfo } = useSignUp();

  const onConfirm = async (data: UserType) => {
    const isValid = await saveUserForm.trigger();

    if (!isValid) {
      toast.show({
        description: `Invalid data`,
      });

      return;
    }

    updateUserInfo(data);

    navigate(Routes.GetLocation as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, marginTop: 50 }}
      keyboardVerticalOffset={0}
    >
      <FormProvider {...saveUserForm}>
        <FormControl isInvalid={!!saveUserForm.formState.errors}>
          <FormField label="Nome completo" name="name" placeholder="Nome completo" />
          <FormField label="Email" name="email" placeholder="Email" />
          <FormField type="password" label="Senha" name="password" placeholder="Senha" />
          <Button
            marginTop={6}
            width="full"
            onPress={() => {
              onConfirm(saveUserForm.getValues() as UserType);
            }}
          >
            Registrar-se
          </Button>
        </FormControl>
      </FormProvider>
    </KeyboardAvoidingView>
  );
};
