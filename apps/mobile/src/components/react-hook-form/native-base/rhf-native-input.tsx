import { Input, IInputProps, FormControl } from 'native-base';
import React from 'react';
import { useController } from 'react-hook-form';

type RHFNativeBaseInputProps = {
  input: IInputProps;
  control: any;
  name: string;
  label?: string;
};

const RHFNativeBaseInput = ({ control, name, input, label, ...props }: RHFNativeBaseInputProps) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <FormControl>
      {!!label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        {...input}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        isInvalid={fieldState.invalid}
      />
    </FormControl>
  );
};

export default RHFNativeBaseInput;
