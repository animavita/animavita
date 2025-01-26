export enum AdoptionSteps {
  PetName = 'PetName',
  PetBreed = 'PetBreed',
  PetType = 'PetType',
  PetAge = 'PetAge',
  PetGender = 'PetGender',
  PetSize = 'PetSize',
  PetObservations = 'PetObservations',
  PetPhotos = 'PetPhotos',
}

export type Step = {
  order: number;
  label: string;
  fieldName: string;
};

export type StepperIndicatorProps = {
  activeStep: AdoptionSteps;
  title: string;
};

export type StepperControllerProps = {
  handleBack: () => void;
  handleNext: () => void;
  onConfirm: () => void;
  saving: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
  activeStep: AdoptionSteps;
};
