import React, { useState } from "react";
import { Box } from "native-base";
import useLocale from "../../shared/hooks/use-locale";
import { useMultiStepNavigation } from "./adoption-form.hooks";
import StepperController from "./compose/stepper-controller";
import StepperIndicator from "./compose/stepper-indicator";
import FormSteps from "./compose/form-steps";

export default function RegisterAdoptionForm() {
  const { activeStep, handleBack, handleNext, isLastStep, isFirstStep } =
    useMultiStepNavigation();

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
        <FormSteps activeStep={activeStep} />
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
