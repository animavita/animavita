import { Box } from 'native-base';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useMultiStepNavigation } from './adoption-form.hooks';
import FormSteps from './compose/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';

export default function RegisterAdoptionForm() {
  const { activeStep, handleBack, handleNext, isLastStep, isFirstStep } = useMultiStepNavigation();
  const adoptionForm = useForm();

  return (
    <Box height="full">
      <StepperIndicator activeStep={activeStep} />
      <Box
        position="relative"
        margin="8"
        display="flex"
        flex-direction="column"
        justify-content="center"
      >
        <FormProvider {...adoptionForm}>
          <FormSteps activeStep={activeStep} />
        </FormProvider>
      </Box>

      <StepperController
        handleBack={handleBack}
        handleNext={handleNext}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
      />
    </Box>
  );
}
