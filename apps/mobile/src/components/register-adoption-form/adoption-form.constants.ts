import { Step, Steps } from "./adoption-form.types";

export const stepsLibrary: {
  [key in Steps]: Step;
} = {
  PersonalInformation: {
    order: 0,
    label: "Personal Information",
  },
  BusinessInformation: { order: 1, label: "Business Information" },
  ReviewSubmit: {
    order: 2,
    label: "Review & Submit",
  },
};
