import { act, renderHook } from '@testing-library/react-hooks';
import { useToast } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { stepsLibrary } from './adoption-form.constants';
import { getStepsByOrder, useFormValidation, useMultiStepNavigation } from './adoption-form.hooks';

import { AdoptionSteps } from './adoption-form.types';

jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: jest.fn(),
}));

describe('useMultiStepNavigation', () => {
  describe('when the current step is PetObservations', () => {
    it('isLastStep is true', () => {
      const { result } = renderHook(() => useMultiStepNavigation(AdoptionSteps.PetObservations));

      expect(result.current.isLastStep).toBeTruthy();
    });
  });

  describe('when handleBack is triggered', () => {
    it('the activeStep is PetBreed', () => {
      const { result } = renderHook(() => useMultiStepNavigation(AdoptionSteps.PetGender));

      act(() => {
        result.current.handleBack();
      });

      expect(result.current.isLastStep).toBeFalsy();
      expect(result.current.activeStep).toBe(AdoptionSteps.PetAge);
    });
  });

  describe('when the current step is PetObservations', () => {
    it('isFirstStep is true', () => {
      const { result } = renderHook(() => useMultiStepNavigation(AdoptionSteps.PetName));

      expect(result.current.isFirstStep).toBeTruthy();
    });

    describe('when handleNext is triggered', () => {
      it('the activeStep is PetSize', () => {
        const { result } = renderHook(() => useMultiStepNavigation(AdoptionSteps.PetGender));

        act(() => {
          result.current.handleNext();
        });

        expect(result.current.isFirstStep).toBeFalsy();
        expect(result.current.activeStep).toBe(AdoptionSteps.PetSize);
      });
    });
  });
});

describe('getStepsByOrder', () => {
  it('returns step ids ordered', () => {
    expect(getStepsByOrder(stepsLibrary)).toStrictEqual({
      0: AdoptionSteps.PetName,
      1: AdoptionSteps.PetBreed,
      2: AdoptionSteps.PetType,
      3: AdoptionSteps.PetAge,
      4: AdoptionSteps.PetGender,
      5: AdoptionSteps.PetSize,
      6: AdoptionSteps.PetObservations,
    });
  });
});

describe('useFormValidation', () => {
  describe('when the form state is not valid', () => {
    it('calls `show` from useToast', async () => {
      const show = jest.fn();
      (useToast as jest.Mock).mockReturnValueOnce({
        show,
        isActive: () => false,
      });

      const errorMessage = '"breed" can not be empty';

      const trigger = () => Promise.resolve(false);
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <FormProvider
          trigger={trigger}
          // @ts-ignore
          getFieldState={() => ({ error: { message: errorMessage } })}
        >
          {children}
        </FormProvider>
      );

      const { result } = renderHook(useFormValidation, { wrapper });

      await result.current.validateField('breed');

      const expected = {
        description: errorMessage,
        id: 'adoption-form-toast',
      };
      expect(show).toHaveBeenNthCalledWith(1, expected);
    });
  });
});
