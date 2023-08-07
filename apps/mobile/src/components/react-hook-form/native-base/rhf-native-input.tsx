import { Input, IInputProps } from 'native-base';
import React from 'react';
import { useController } from 'react-hook-form';

type RHFNativeBaseInputProps = {
  input: IInputProps;
  control: any;
  name: string;
};

const RHFNativeBaseInput = ({ control, name, input, ...props }: RHFNativeBaseInputProps) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <Input
      {...input}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
    />
  );
};

export default RHFNativeBaseInput;
