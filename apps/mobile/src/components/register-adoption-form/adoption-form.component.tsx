import { AdoptionType } from '@animavita/models';
import { createValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, useToast } from 'native-base';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useMultiStepNavigation } from './adoption-form.hooks';
import { AdoptionSteps } from './adoption-form.types';
import FormSteps from './compose/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';
import useAdoptions from '../../hooks/use-adoptions';

type RegisterAdoptionFormProps = {
  defaultValues?: Partial<AdoptionType>;
  initialStep?: AdoptionSteps;
};

const RegisterAdoptionForm = ({ defaultValues, initialStep }: RegisterAdoptionFormProps) => {
  const { activeStep, handleBack, handleNext, isLastStep, isFirstStep } =
    useMultiStepNavigation(initialStep);
  const adoptionForm = useForm<Partial<AdoptionType>>({
    resolver: joiResolver(createValidationSchema),
    mode: 'onBlur',
    defaultValues,
  });
  const { saveOrCreateAdoption, saving } = useAdoptions();
  const toast = useToast();

  const onConfirm = async () => {
    const isValid = await adoptionForm.trigger();

    if (!isValid) {
      toast.show({
        description: 'Invalid data!',
      });
      return;
    }

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
};

export default RegisterAdoptionForm;
