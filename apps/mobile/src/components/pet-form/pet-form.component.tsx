import { AdoptionType } from '@animavita/types';
import { adoptionValidationSchema } from '@animavita/validation-schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, KeyboardAvoidingView, useToast } from 'native-base';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

import FormSteps from './compose/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';
import { useMultiStepNavigation } from './hooks/use-multi-step-navigation.hook';
import { AdoptionSteps } from './pet-form.types';

import Delimiter from '@/components/delimiter';
import useLocale from '@/hooks/use-locale';
import usePets from '@/hooks/use-pets/use-pets';

export const validationSchema = adoptionValidationSchema.fork(
  ['name', 'gender', 'breed', 'type', 'age', 'size'],
  (schema) => schema.required()
);

type PetFormProps = {
  defaultValues?: Partial<AdoptionType & { id?: string }>;
  initialStep?: AdoptionSteps;
  title: string;
};

const PetForm = ({ defaultValues, initialStep, title }: PetFormProps) => {
  const { t } = useLocale();
  const { activeStep, isLastStep, isFirstStep, handleBack, handleNext } =
    useMultiStepNavigation(initialStep);

  const petForm = useForm<Partial<AdoptionType>>({
    resolver: joiResolver(validationSchema),
    mode: 'onChange',
    defaultValues,
  });
  const { saveOrCreatePet, saving } = usePets();
  const toast = useToast();

  const onConfirm = async () => {
    const isValid = await petForm.trigger();

    if (!isValid) {
      toast.show({
        description: t('REGISTER_ADOPTION.FORM_ERROR_MESSAGES.INVALID_DATA'),
      });

      return;
    }

    const pet = petForm.getValues();

    await saveOrCreatePet(pet);
  };

  return (
    <KeyboardAvoidingView flex="1" behavior="padding" enabled={Platform.OS === 'ios'}>
      <FormProvider {...petForm}>
        <StepperIndicator activeStep={activeStep} title={title} />
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

export default PetForm;
