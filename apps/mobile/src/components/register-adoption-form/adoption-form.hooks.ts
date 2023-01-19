import { useToast } from 'native-base';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { stepsLibrary } from './adoption-form.constants';
import { Step, AdoptionSteps } from './adoption-form.types';

export const getStepsByOrder = (stepsLibrary: { [key in AdoptionSteps]: Step }): {
  [key: number]: AdoptionSteps;
} =>
  Object.keys(AdoptionSteps).reduce((prev, stepId) => {
    const step = stepId as AdoptionSteps;
    return { ...prev, [stepsLibrary[step].order]: step };
  }, {});

export function useMultiStepNavigation(initialStep = AdoptionSteps.PetName) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const stepsByOrder = getStepsByOrder(stepsLibrary);
  const currentStepNumber = stepsLibrary[activeStep].order;
  const isFirstStep = currentStepNumber === 0;

  const isLastStep = () => {
    const totalSteps = Object.keys(AdoptionSteps).length - 1;

    return currentStepNumber >= totalSteps;
  };

  const handleBack = () => {
    const step = stepsByOrder[currentStepNumber - 1];

    setActiveStep(step);
  };

  const handleNext = () => {
    const step = stepsByOrder[currentStepNumber + 1];

    setActiveStep(step);
  };

  return {
    isFirstStep,
    isLastStep: isLastStep(),
    handleBack,
    handleNext,
    activeStep,
  };
}

export function useFormValidation() {
  const { trigger, getFieldState } = useFormContext();
  const { show, isActive } = useToast();

  const showFeedback = (fieldName: string) => {
    const fieldState = getFieldState(fieldName);

    const id = 'adoption-form-toast';
    const description = fieldState?.error?.message as React.ReactNode;

    if (!isActive(id)) {
      show({
        description,
        id,
      });
    }
  };

  const validateField = async (fieldName: string) => {
    const isValid = await trigger(fieldName, { shouldFocus: true });

    if (!isValid) showFeedback(fieldName);

    return isValid;
  };

  return {
    validateField,
  };
}
