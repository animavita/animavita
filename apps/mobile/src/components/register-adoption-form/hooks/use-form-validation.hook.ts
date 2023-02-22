import { useToast } from 'native-base';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import useLocale from '../../../shared/hooks/use-locale';

export const mountErrorMessage = (fieldName: string, type: string) => {
  const [, kind] = type.toUpperCase().split('.');

  return `${fieldName.toUpperCase()}_${kind}`;
};

export const useFormValidation = () => {
  const { t } = useLocale();

  const { trigger, getFieldState } = useFormContext();
  const { show, isActive } = useToast();

  const showFeedback = (fieldName: string) => {
    const fieldError = getFieldState(fieldName);

    const id = 'adoption-form-toast';

    const errorMessage = mountErrorMessage(fieldName, fieldError?.error?.type as string);
    const description = t(
      `REGISTER_ADOPTION.FORM_ERROR_MESSAGES.${errorMessage}`
    ) as React.ReactNode;

    if (!isActive(id)) show({ id, description });
  };

  const validateField = async (fieldName: string) => {
    const isValid = await trigger(fieldName, { shouldFocus: true });

    if (!isValid) showFeedback(fieldName);

    return isValid;
  };

  return { validateField };
};
