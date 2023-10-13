import { FormControl, Stack } from 'native-base';
import { useFormContext } from 'react-hook-form';

import { RHFInput } from '../../../components/react-hook-form/native-base';
import useLocale from '../../../hooks/use-locale';
import theme from '../../../theme';

type FormFieldProps = {
  name: string;
  placeholder: string;
  label: string;
  type?: 'text' | 'password';
  autoFocus?: boolean;
};

const commonInputProperties = {
  size: 'xl',
  borderColor: theme.colors.primary[600],
  variant: 'outline',
  autoFocus: true,
};

const mountErrorMsg = (fieldName: string, errorType: string) => {
  const baseToken = `SIGN_UP.FORM_ERROR_MESSAGES`;
  const errorkey = fieldName.toUpperCase();
  const [_, kind] = errorType.toUpperCase().split('.');

  return `${baseToken}.${errorkey}_${kind}`;
};

const FormField = ({ label, name, placeholder, type, autoFocus }: FormFieldProps) => {
  const { control } = useFormContext();

  const { error } = control.getFieldState(name);

  const { t } = useLocale();

  return (
    <Stack my={4} width="full">
      <FormControl.Label>{label}</FormControl.Label>

      <RHFInput
        input={{
          ...commonInputProperties,
          placeholder,
          testID: `signup-form-${name}-input`,
          returnKeyType: 'next',
          type: type || 'text',
          isRequired: true,
          autoFocus,
        }}
        control={control}
        name={name}
      />

      <FormControl.ErrorMessage>
        {error && t(`${mountErrorMsg(name, error.type)}`)}
      </FormControl.ErrorMessage>
    </Stack>
  );
};

export { FormField };
