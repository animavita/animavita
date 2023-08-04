import { Box, Button } from 'native-base';
import React from 'react';

import useLocale from '../../../../hooks/use-locale';
import theme from '../../../../theme';
import { stepsLibrary } from '../../adoption-form.constants';
import { StepperControllerProps } from '../../adoption-form.types';
import { useFormValidation } from '../../hooks/use-form-validation.hook';

const StepperController = ({
  handleBack,
  handleNext,
  onConfirm,
  isLastStep,
  activeStep,
  saving,
}: StepperControllerProps) => {
  const { t } = useLocale();
  const { validateField } = useFormValidation();

  const onBackPress = () => {
    handleBack();
  };

  const onNextPress = async () => {
    if (isLastStep) {
      onConfirm();
      return;
    }

    const fieldName = stepsLibrary[activeStep].fieldName;
    const isValid = await validateField(fieldName);

    if (isValid) handleNext();
  };

  const label = isLastStep
    ? t('REGISTER_ADOPTION.FORM.CONFIRM_BUTTON')
    : t('REGISTER_ADOPTION.FORM.NEXT_BUTTON');

  return (
    <Box marginTop="auto" display="flex" flexDirection="row" justifyContent="space-between">
      <Button
        color={theme.colors.primary[600]}
        variant="outline"
        onPress={onBackPress}
        disabled={saving}
      >
        {t('REGISTER_ADOPTION.FORM.BACK_BUTTON')}
      </Button>
      <Button
        color={theme.colors.primary[600]}
        onPress={onNextPress}
        marginLeft="auto"
        disabled={saving}
        isLoading={saving}
        isLoadingText={label}
      >
        {label}
      </Button>
    </Box>
  );
};

export default StepperController;
