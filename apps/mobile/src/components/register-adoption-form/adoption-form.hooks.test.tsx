import { act, renderHook } from '@testing-library/react-hooks';

import { stepsLibrary } from './adoption-form.constants';
import { getStepsByOrder, useMultiStepNavigation } from './adoption-form.hooks';
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
