import { Input } from 'native-base';
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';
import React from 'react';
import { useController } from 'react-hook-form';

type RHFNativeBaseInputProps = {
  input: IInputProps;
  control: any;
  name: any;
};

function RHFNativeBaseInput({ control, name, input }: RHFNativeBaseInputProps) {
  const { field } = useController({ control, name });

  return <Input {...input} value={field.value} onChangeText={field.onChange} />;
}

export default RHFNativeBaseInput;
