import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import StepperController from './stepper-controller';

import { AdoptionSteps, StepperControllerProps } from '@/components/pet-form/pet-form.types';
import * as useFormValidationModule from '@/hooks/react-hook-form/use-form-validation/use-form-validation.hook';
import { renderWithProviders, fireEvent, waitFor } from '@/test/test-utils';

const handleBack = jest.fn();
const handleNext = jest.fn();
const onConfirm = jest.fn();

const Providers = ({ children }: { children: React.ReactElement }) => {
  const form = useForm();
  return <FormProvider {...form}>{children}</FormProvider>;
};

const setup = (propsOverride: Partial<StepperControllerProps> = {}) => {
  return renderWithProviders(
    <Providers>
      <StepperController
        handleBack={handleBack}
        handleNext={handleNext}
        onConfirm={onConfirm}
        isLastStep={false}
        isFirstStep={false}
        activeStep={AdoptionSteps.PetName}
        saving={false}
        {...propsOverride}
      />
    </Providers>
  );
};

describe('StepperController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the back button is pressed', () => {
    it('calls `handleBack`', () => {
      const { getByText } = setup();

      fireEvent.press(getByText(/voltar/i));

      expect(handleBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the next button is pressed', () => {
    it('calls `onNextPress`', async () => {
      jest.spyOn(useFormValidationModule, 'default').mockReturnValueOnce({
        validateField: () => Promise.resolve(true),
      });

      const { getByText } = setup();

      fireEvent.press(getByText(/pr[oó]xima etapa/gi));

      await waitFor(() => expect(handleNext).toHaveBeenCalledTimes(1));
    });
  });

  describe('when the next button is pressed and it is the last step', () => {
    it('calls `onConfirm`', () => {
      const { getByText } = setup({ isLastStep: true });

      fireEvent.press(getByText(/confirmar/gi));

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('when `saving` is true', () => {
    it('disables next button', () => {
      const { getByText } = setup({ saving: true, isLastStep: true });

      expect(getByText(/confirmar/i)).toBeDisabled();
    });
  });
});
