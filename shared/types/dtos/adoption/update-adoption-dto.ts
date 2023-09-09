import AdoptionType from "./adoption-dto";

export type UpdateAdoptionRequest = Partial<
  AdoptionType & {
    id: string;
  }
>;
