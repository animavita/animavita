import { AdoptionType } from '@animavita/models';
import { createValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box } from 'native-base';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useMultiStepNavigation } from './adoption-form.hooks';
import FormSteps from './compose/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';
import useAdoptions from '../../hooks/use-adoptions';

type RegisterAdoptionFormProps = {
  defaultValues?: Partial<AdoptionType>;
};

export default function RegisterAdoptionForm({ defaultValues }: RegisterAdoptionFormProps) {
  const { activeStep, handleBack, handleNext, isLastStep, isFirstStep } = useMultiStepNavigation();
  const adoptionForm = useForm<Partial<AdoptionType>>({
    resolver: joiResolver(createValidationSchema),
    mode: 'onBlur',
    defaultValues,
  });
  const { saveOrCreateAdoption, saving } = useAdoptions();

  const onConfirm = async () => {
    if (!adoptionForm.formState.isValid) return;

    const adoption = adoptionForm.getValues();

    await saveOrCreateAdoption(adoption);
  };

  return (
    <Box height="full">
      <FormProvider {...adoptionForm}>
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
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
          activeStep={activeStep}
          saving={saving}
          handleBack={handleBack}
          handleNext={handleNext}
          onConfirm={onConfirm}
        />
      </FormProvider>
    </Box>
  );
}
