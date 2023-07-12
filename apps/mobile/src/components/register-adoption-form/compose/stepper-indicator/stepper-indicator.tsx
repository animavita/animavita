import { Box, Heading, Progress, Text, Image } from 'native-base';
import React from 'react';

import StepIcon from '../../../../../assets/step-background.png';
import useLocale from '../../../../hooks/use-locale';
import theme from '../../../../theme';
import { stepsLibrary } from '../../adoption-form.constants';
import { StepperIndicatorProps } from '../../adoption-form.types';

const StepperIndicator = ({ activeStep }: StepperIndicatorProps) => {
  const { t } = useLocale();

  const totalSteps = Object.keys(stepsLibrary).length;
  const stepNumber = stepsLibrary[activeStep].order + 1;
  const processValue = (stepNumber * 100) / totalSteps;
  const label = stepsLibrary[activeStep].label;

  return (
    <Box>
      <Progress
        position="absolute"
        w="full"
        value={processValue}
        _filledTrack={{ rounded: 'none', borderBottomRightRadius: 'md' }}
        rounded="none"
        _ios={{
          display: 'none',
        }}
      />
      <Box
        position="relative"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignContent="center"
      >
        <Box>
          <Text color={theme.colors.gray[600]}>{t('REGISTER_ADOPTION.TITLE')}</Text>
          <Heading fontWeight="medium" color={theme.colors.primary[600]}>
            {t(label)}
          </Heading>
        </Box>
        <Image
          position="absolute"
          right={-18}
          bottom={-14}
          source={StepIcon}
          alt="stepper icon"
          size="md"
        />
        <Box alignItems="center" justifyContent="center">
          <Text fontWeight="medium" color="white" fontSize="sm">
            {t('REGISTER_ADOPTION.STEP')}
          </Text>
          <Text lineHeight="sm" fontWeight="medium" color="white" fontSize="2xl">
            {stepNumber}/{totalSteps}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default StepperIndicator;
