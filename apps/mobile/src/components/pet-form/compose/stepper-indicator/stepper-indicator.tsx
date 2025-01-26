import StepIcon from '@assets/step-background.png';
import { Box, Heading, Progress, Text, Image } from 'native-base';
import React from 'react';

import Delimiter from '@/components/delimiter/delimiter';
import { stepsLibrary } from '@/components/pet-form/pet-form.constants';
import { StepperIndicatorProps } from '@/components/pet-form/pet-form.types';
import useLocale from '@/hooks/use-locale';
import theme from '@/theme';

const StepperIndicator = ({ activeStep, title }: StepperIndicatorProps) => {
  const { t } = useLocale();

  const totalSteps = Object.keys(stepsLibrary).length;
  const stepNumber = stepsLibrary[activeStep].order + 1;
  const processValue = (stepNumber * 100) / totalSteps;
  const label = stepsLibrary[activeStep].label;

  return (
    <Box>
      <Progress
        w="full"
        value={processValue}
        _filledTrack={{ rounded: 'none', borderBottomRightRadius: 'md' }}
        rounded="none"
        _ios={{
          display: 'none',
        }}
      />
      <Delimiter marginY={0}>
        <Box
          position="relative"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignContent="center"
          _android={{ marginTop: 5 }}
          _web={{ marginTop: 7 }}
        >
          <Box>
            <Text color={theme.colors.gray[600]}>{title}</Text>
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
      </Delimiter>
    </Box>
  );
};

export default StepperIndicator;
