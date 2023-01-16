import { useNavigation } from '@react-navigation/native';
import { Box, Button } from 'native-base';
import React from 'react';

import useLocale from '../../../../shared/hooks/use-locale';
import theme from '../../../../theme';
import { StepperControllerProps } from '../../adoption-form.types';

function StepperController({
  handleBack,
  handleNext,
  isLastStep,
  isFirstStep,
}: StepperControllerProps) {
  const { t } = useLocale();
  const navigation = useNavigation();

  const onBackPress = () => {
    if (isFirstStep) {
      navigation.goBack();
      return;
    }

    handleBack();
  };

  const onNextPress = () => {
    if (isLastStep) return;

    handleNext();
  };

  return (
    <Box
      margin="8"
      marginTop="auto"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Button color={theme.colors.primary[600]} variant="outline" onPress={onBackPress}>
        {t('REGISTER_ADOPTION.FORM.BACK_BUTTON')}
      </Button>
      <Button color={theme.colors.primary[600]} onPress={onNextPress}>
        {isLastStep
          ? t('REGISTER_ADOPTION.FORM.CONFIRM_BUTTON')
          : t('REGISTER_ADOPTION.FORM.NEXT_BUTTON')}
      </Button>
    </Box>
  );
}

export default StepperController;
