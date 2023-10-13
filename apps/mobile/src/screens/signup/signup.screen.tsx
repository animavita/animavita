import { Heading, Stack, Text } from 'native-base';

import { SignUpForm } from './compose';
import SafeArea from '../../components/safe-area';
import theme from '../../theme';

const SignUp = () => {
  return (
    <Stack flex="1" padding={6}>
      <Heading fontSize="4xl" color={theme.colors.primary[600]}>
        Animavita
      </Heading>
      <Text fontSize="2xl">Registrar-se</Text>
      <SafeArea>
        <SignUpForm />
      </SafeArea>
    </Stack>
  );
};

export default SignUp;
