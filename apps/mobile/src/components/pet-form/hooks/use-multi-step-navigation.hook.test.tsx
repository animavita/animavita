import { NavigationContainer } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';

import { getStepsByOrder, useMultiStepNavigation } from './use-multi-step-navigation.hook';
import { stepsLibrary } from '../pet-form.constants';
import { AdoptionSteps } from '../pet-form.types';

jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: jest.fn(),
}));

describe('getStepsByOrder', () => {
  it('returns step ids ordered', () => {
    expect(getStepsByOrder(stepsLibrary)).toStrictEqual({
      0: AdoptionSteps.PetName,
      1: AdoptionSteps.PetBreed,
      2: AdoptionSteps.PetType,
      3: AdoptionSteps.PetAge,
      4: AdoptionSteps.PetGender,
      5: AdoptionSteps.PetSize,
      6: AdoptionSteps.PetPhotos,
      7: AdoptionSteps.PetObservations,
    });
  });
});

const wrapper = ({ children }: { children: React.ReactElement }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const setup = (step: AdoptionSteps) =>
  renderHook(() => useMultiStepNavigation(step), {
    wrapper,
  });

describe('useMultiStepNavigation', () => {
  describe('when the current step is PetObservations', () => {
    it('isLastStep is true', () => {
      const { result } = setup(AdoptionSteps.PetObservations);

      expect(result.current.isLastStep).toBeTruthy();
    });
  });

  describe('when handleBack is triggered', () => {
    it('the activeStep is PetAge', () => {
      const { result } = setup(AdoptionSteps.PetGender);

      act(() => {
        result.current.handleBack();
      });

      expect(result.current.isLastStep).toBeFalsy();
      expect(result.current.activeStep).toBe(AdoptionSteps.PetAge);
    });
  });

  describe('when the current step is PetObservations', () => {
    it('isFirstStep is true', () => {
      const { result } = setup(AdoptionSteps.PetName);

      expect(result.current.isFirstStep).toBeTruthy();
    });

    describe('when handleNext is triggered', () => {
      it('the activeStep is PetSize', () => {
        const { result } = setup(AdoptionSteps.PetGender);

        act(() => {
          result.current.handleNext();
        });

        expect(result.current.isFirstStep).toBeFalsy();
        expect(result.current.activeStep).toBe(AdoptionSteps.PetSize);
      });
    });
  });
});
