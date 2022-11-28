export enum Steps {
  PersonalInformation = "PersonalInformation",
  BusinessInformation = "BusinessInformation",
  ReviewSubmit = "ReviewSubmit",
}

export type Step = {
  order: number;
  label: string;
};
