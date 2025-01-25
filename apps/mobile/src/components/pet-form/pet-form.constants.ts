import { Step, AdoptionSteps } from './pet-form.types';

export const stepsLibrary: {
  [key in AdoptionSteps]: Step;
} = {
  PetName: { order: 0, label: 'REGISTER_ADOPTION.FORM.NAME', fieldName: 'name' },
  PetBreed: { order: 1, label: 'REGISTER_ADOPTION.FORM.BREED', fieldName: 'breed' },
  PetType: { order: 2, label: 'REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL', fieldName: 'type' },
  PetAge: { order: 3, label: 'REGISTER_ADOPTION.FORM.AGE_OPTIONS.LABEL', fieldName: 'age' },
  PetGender: { order: 4, label: 'REGISTER_ADOPTION.FORM.GENDER.LABEL', fieldName: 'gender' },
  PetSize: { order: 5, label: 'REGISTER_ADOPTION.FORM.SIZE.LABEL', fieldName: 'size' },
  PetPhotos: {
    order: 6,
    label: 'REGISTER_ADOPTION.FORM.PHOTOS.LABEL',
    fieldName: 'photos',
  },
  PetObservations: {
    order: 7,
    label: 'REGISTER_ADOPTION.FORM.OBSERVATIONS',
    fieldName: 'observations',
  },
};
