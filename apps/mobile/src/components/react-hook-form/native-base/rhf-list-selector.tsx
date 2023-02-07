import { Button } from 'native-base';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type RHFNativeBaseListSelectorProps = {
  name: string;
  options: Option[];
};

const RHFNativeBaseListSelector = ({ name, options }: RHFNativeBaseListSelectorProps) => {
  const { setValue } = useFormContext();
  const petTypeValue = useWatch({ name });

  const changeValue = (value: string) => setValue(name, value);

  return (
    <>
      {options.map((option) => (
        <Button
          variant={option.value === petTypeValue ? 'solid' : 'outline'}
          marginY="2"
          key={option.value}
          onPress={() => changeValue(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </>
  );
};

export default RHFNativeBaseListSelector;
