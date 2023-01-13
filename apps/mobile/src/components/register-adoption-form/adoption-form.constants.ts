import { Step, AdoptionSteps } from "./adoption-form.types";

export const stepsLibrary: {
  [key in AdoptionSteps]: Step;
} = {
  PetName: { order: 0, label: "REGISTER_ADOPTION.FORM.NAME" },
  PetBreed: { order: 1, label: "REGISTER_ADOPTION.FORM.BREED" },
  PetType: { order: 2, label: "REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL" },
  PetAge: { order: 3, label: "REGISTER_ADOPTION.FORM.AGE" },
  PetGender: { order: 4, label: "REGISTER_ADOPTION.FORM.GENDER.LABEL" },
  PetSize: { order: 5, label: "REGISTER_ADOPTION.FORM.SIZE.LABEL" },
  PetObservations: { order: 6, label: "REGISTER_ADOPTION.FORM.OBSERVATIONS" },
};
