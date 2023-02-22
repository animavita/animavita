import { useState } from 'react';

import { stepsLibrary } from '../adoption-form.constants';
import { AdoptionSteps, Step } from '../adoption-form.types';

export const getStepsByOrder = (stepsLibrary: { [key in AdoptionSteps]: Step }): {
  [key: number]: AdoptionSteps;
} =>
  Object.keys(AdoptionSteps).reduce((prev, stepId) => {
    const step = stepId as AdoptionSteps;
    return { ...prev, [stepsLibrary[step].order]: step };
  }, {});

export const useMultiStepNavigation = (initialStep = AdoptionSteps.PetName) => {
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
};
