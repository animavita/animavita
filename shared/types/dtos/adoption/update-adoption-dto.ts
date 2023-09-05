import AdoptionDTO from "./adoption-dto";

export type UpdateAdoptionRequest = Partial<
  AdoptionDTO & {
    id: string;
  }
>;
