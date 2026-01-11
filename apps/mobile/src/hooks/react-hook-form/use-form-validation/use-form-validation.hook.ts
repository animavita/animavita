import { useToast } from 'native-base';
import { useFormContext } from 'react-hook-form';

import useLocale from '@/hooks/use-locale';

export const mountErrorMessage = (fieldName: string, type: string) => {
  const [, kind] = type.toUpperCase().split('.');

  return `${fieldName.toUpperCase()}_${kind}`;
};

const useFormValidation = (formName: string, translationPath: string) => {
  const { t } = useLocale();

  const { trigger, getFieldState, getValues } = useFormContext();
  const { show, isActive } = useToast();

  const getInlineArrayError = (fieldName: string): string | null => {
    const values = getValues(fieldName);
    if (!Array.isArray(values)) return null;

    return values.find((item) => item?.error)?.error || null;
  };

  const showFeedback = (fieldName: string) => {
    const id = `${formName}-form-toast`;

    const inlineError = getInlineArrayError(fieldName);
    if (inlineError) {
      if (!isActive(id)) show({ id, description: inlineError });
      return;
    }

    const fieldError = getFieldState(fieldName);
    const errorMessage = mountErrorMessage(fieldName, fieldError?.error?.type as string);
    const description = t(`${translationPath}.${errorMessage}`);

    if (!isActive(id)) show({ id, description });
  };

  const validateField = async (fieldName: string) => {
    const isValid = await trigger(fieldName, { shouldFocus: true });

    if (!isValid) showFeedback(fieldName);

    return isValid;
  };

  return { validateField };
};

export default useFormValidation;
