import { Input, IInputProps } from 'native-base';
import React from 'react';
import { useController } from 'react-hook-form';

type RHFNativeBaseInputProps = {
  input: IInputProps;
  control: any;
  name: string;
};

const RHFNativeBaseInput = ({ control, name, input }: RHFNativeBaseInputProps) => {
  const { field } = useController({ control, name });

  return (
    <Input {...input} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
  );
};

export default RHFNativeBaseInput;
