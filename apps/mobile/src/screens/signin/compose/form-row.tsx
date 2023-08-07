import { View } from 'native-base';

type FormRowProps = {
  children: React.ReactNode;
};

const FormRow = ({ children }: FormRowProps) => {
  return <View marginY={2}>{children}</View>;
};

export { FormRow };
