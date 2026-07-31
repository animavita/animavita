import { adoptionValidationSchema } from '@animavita/validation-schemas';
import { Box, KeyboardAvoidingView, useToast } from 'native-base';
import React from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { Platform } from 'react-native';

import FormSteps from './compose/form-steps';
import StepperController from './compose/stepper-controller';
import StepperIndicator from './compose/stepper-indicator';
import { useMultiStepNavigation } from './hooks/use-multi-step-navigation.hook';
import { AdoptionSteps } from './pet-form.types';
import { PetFormValues, usePetForm } from '../../hooks/use-pet-form/use-pet-form';

import { Delimiter } from '@/components/delimiter/delimiter';
import useLocale from '@/hooks/use-locale';
import { useSavePet } from '@/hooks/use-save-pet/use-save-pet';

export const validationSchema = adoptionValidationSchema.fork(
  ['name', 'gender', 'breed', 'type', 'maturity', 'size', 'photos'],
  (schema) => schema.required()
);

type PetFormProps = {
  defaultValues?: Partial<PetFormValues>;
  initialStep?: AdoptionSteps;
  title: string;
};

const PetForm = ({ defaultValues, initialStep, title }: PetFormProps) => {
  const petForm = usePetForm(defaultValues);

  return (
    <KeyboardAvoidingView flex="1" behavior="padding" enabled={Platform.OS === 'ios'}>
      <FormProvider {...petForm}>
        <PetFormInner initialStep={initialStep} title={title} />
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

type PetFormInnerProps = {
  initialStep?: AdoptionSteps;
  title: string;
};

const PetFormInner = ({ initialStep, title }: PetFormInnerProps) => {
  const { t } = useLocale();
  const toast = useToast();
  const { activeStep, isLastStep, isFirstStep, handleBack, handleNext } =
    useMultiStepNavigation(initialStep);

  const { trigger, getValues } = useFormContext<Partial<PetFormValues>>();
  const { saveOrCreatePet, saving, uploadProgress } = useSavePet();

  const onConfirm = async () => {
    const isValid = await trigger();

    if (!isValid) {
      toast.show({
        description: t('REGISTER_ADOPTION.FORM_ERROR_MESSAGES.INVALID_DATA'),
      });
      return;
    }

    await saveOrCreatePet(getValues());
  };

  return (
    <>
      <StepperIndicator activeStep={activeStep} title={title} />
      <Delimiter flex="1" marginBottom="4">
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
          uploadProgress={uploadProgress}
          handleBack={handleBack}
          handleNext={handleNext}
          onConfirm={onConfirm}
        />
      </Delimiter>
    </>
  );
};

export default PetForm;
