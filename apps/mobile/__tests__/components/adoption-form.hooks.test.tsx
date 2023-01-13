import { act, renderHook } from "@testing-library/react-hooks";
import { useMultiStepNavigation } from "../../src/components/register-adoption-form/adoption-form.hooks";
import { AdoptionSteps } from "../../src/components/register-adoption-form/adoption-form.types";

describe("useMultiStepNavigation", () => {
  describe("when the current step is PetSize", () => {
    it("isLastStep is true", () => {
      const { result } = renderHook(() =>
        useMultiStepNavigation(AdoptionSteps.PetSize)
      );

      expect(result.current.isLastStep).toBeTruthy();
    });
  });

  describe("when handleBack is triggered", () => {
    it("the activeStep is PetBreed", () => {
      const { result } = renderHook(() =>
        useMultiStepNavigation(AdoptionSteps.PetGender)
      );

      act(() => {
        result.current.handleBack();
      });

      expect(result.current.isLastStep).toBeFalsy();
      expect(result.current.activeStep).toBe(AdoptionSteps.PetAge);
    });
  });

  describe("when the current step is PetObservations", () => {
    it("isFirstStep is true", () => {
      const { result } = renderHook(() =>
        useMultiStepNavigation(AdoptionSteps.PetName)
      );

      expect(result.current.isFirstStep).toBeTruthy();
    });

    describe("when handleNext is triggered", () => {
      it("the activeStep is PetSize", () => {
        const { result } = renderHook(() =>
          useMultiStepNavigation(AdoptionSteps.PetGender)
        );

        act(() => {
          result.current.handleNext();
        });

        expect(result.current.isFirstStep).toBeFalsy();
        expect(result.current.activeStep).toBe(AdoptionSteps.PetSize);
      });
    });
  });
});
