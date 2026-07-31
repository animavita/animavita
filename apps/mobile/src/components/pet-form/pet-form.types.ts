import type { UploadProgress } from '@/hooks/use-upload-photos';

export enum AdoptionSteps {
  PetName = 'PetName',
  PetBreed = 'PetBreed',
  PetType = 'PetType',
  PetMaturity = 'PetMaturity',
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
  uploadProgress: UploadProgress | null;
  isLastStep: boolean;
  isFirstStep: boolean;
  activeStep: AdoptionSteps;
};
