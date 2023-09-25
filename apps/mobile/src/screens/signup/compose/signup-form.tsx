import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input } from 'native-base';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { FormRow } from './form-row';
import Routes from '../../../routes';

export const SignUpForm = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { navigate } = useNavigation();

  const onConfirm = () => {
    navigate(Routes.GetLocation as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, marginTop: 50 }}
      keyboardVerticalOffset={0}
    >
      <FormControl isRequired>
        <FormRow>
          <FormControl.Label>Nome completo</FormControl.Label>
          <Input type="text" placeholder="Nome" value={fullName} onChangeText={setFullName} />
        </FormRow>
        <FormRow>
          <FormControl.Label>Email</FormControl.Label>
          <Input type="text" placeholder="Email" value={email} onChangeText={setEmail} />
        </FormRow>
        <FormRow>
          <FormControl.Label>Senha</FormControl.Label>
          <Input type="password" placeholder="Senha" value={password} onChangeText={setPassword} />
          <FormControl.ErrorMessage>Must be atleast 6 characters.</FormControl.ErrorMessage>
        </FormRow>
        <FormRow>
          <Button marginTop={8} width="full" onPress={onConfirm}>
            Registrar-se
          </Button>
        </FormRow>
      </FormControl>
    </KeyboardAvoidingView>
  );
};
