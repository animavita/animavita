export enum Steps {
  PetName = "PetName",
  PetBreed = "PetBreed",
  PetObservations = "PetObservations",
  PetType = "PetType",
  PetAge = "PetAge",
  PetGender = "PetGender",
  PetSize = "PetSize",
}

export type Step = {
  order: number;
  label: string;
};

export type HorizontalStepperProps = {
  activeStep: Steps;
};

export type StepperControllerProps = {
  handleBack: () => void;
  handleNext: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};
