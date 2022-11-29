import { Step, Steps } from "./adoption-form.types";

export const stepsLibrary: {
  [key in Steps]: Step;
} = {
  PetName: { order: 0, label: "PetName" },
  PetBreed: { order: 1, label: "PetBreed" },
  PetObservations: { order: 2, label: "PetObservations" },
  PetType: { order: 3, label: "PetType" },
  PetAge: { order: 4, label: "PetAge" },
  PetGender: { order: 5, label: "PetGender" },
  PetSize: { order: 6, label: "PetSize" },
};
