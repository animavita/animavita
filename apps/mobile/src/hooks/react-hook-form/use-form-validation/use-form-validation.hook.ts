import { useToast } from 'native-base';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import useLocale from '@/hooks/use-locale';

export const mountErrorMessage = (fieldName: string, type: string) => {
  const [, kind] = type.toUpperCase().split('.');

  return `${fieldName.toUpperCase()}_${kind}`;
};

const useFormValidation = (formName: string, translationPath: string) => {
  const { t } = useLocale();

  const { trigger, getFieldState } = useFormContext();
  const { show, isActive } = useToast();

  const showFeedback = (fieldName: string) => {
    const fieldError = getFieldState(fieldName);

    const id = `${formName}-form-toast`;

    const errorMessage = mountErrorMessage(fieldName, fieldError?.error?.type as string);
    const description = t(`${translationPath}.${errorMessage}`) as React.ReactNode;

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
