import { Stack } from 'native-base';

type FormRowProps = {
  children: React.ReactNode;
};

const FormRow = ({ children }: FormRowProps) => {
  return (
    <Stack my={4} width="full">
      {children}
    </Stack>
  );
};

export { FormRow };
