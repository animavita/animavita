export enum AdoptionSteps {
  PetName = 'PetName',
  PetBreed = 'PetBreed',
  PetType = 'PetType',
  PetAge = 'PetAge',
  PetGender = 'PetGender',
  PetSize = 'PetSize',
  PetObservations = 'PetObservations',
}

export type Step = {
  order: number;
  label: string;
  fieldName: string;
};

export type StepperIndicatorProps = {
  activeStep: AdoptionSteps;
};

export type StepperControllerProps = {
  handleBack: () => void;
  handleNext: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  activeStep: AdoptionSteps;
};
