import { AdoptionType } from '@animavita/models';
import { createValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, KeyboardAvoidingView, useToast } from 'native-base';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

import { AdoptionSteps } from './adoption-form.types';
import FormSteps from './compose/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';
import { useMultiStepNavigation } from './hooks/use-multi-step-navigation.hook';
import useAdoptions from '../../hooks/use-adoptions';
import Delimiter from '../delimiter';

type RegisterAdoptionFormProps = {
  defaultValues?: Partial<AdoptionType>;
  initialStep?: AdoptionSteps;
};

const RegisterAdoptionForm = ({ defaultValues, initialStep }: RegisterAdoptionFormProps) => {
  const { activeStep, isLastStep, isFirstStep, handleBack, handleNext } =
    useMultiStepNavigation(initialStep);

  const adoptionForm = useForm<Partial<AdoptionType>>({
    resolver: joiResolver(createValidationSchema),
    mode: 'onChange',
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
    <KeyboardAvoidingView flex="1" behavior="padding" enabled={Platform.OS === 'ios'}>
      <FormProvider {...adoptionForm}>
        <StepperIndicator activeStep={activeStep} />
        <Delimiter marginTop={0} flex="1">
          <Box
            position="relative"
            marginTop="8"
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
        </Delimiter>
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

export default RegisterAdoptionForm;
