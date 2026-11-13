import { UserResponse } from "../user";

export type AnimalGendersType = "male" | "female";
export type AnimalType = "dog" | "cat" | "other";
export type AnimalSizesType = "small" | "medium" | "big";
export type AnimalMaturitiesType = "puppy" | "young" | "adult" | "senior";
export type AnimalStatusType = "available" | "adopted";

export type AdoptionType = {
  name: string;
  gender: AnimalGendersType;
  breed: string;
  type: AnimalType;
  maturity: AnimalMaturitiesType;
  size: AnimalSizesType;
  observations: string;
  photos: string[];
};

export type AdoptionResponse = AdoptionType & {
  id: string;
  status: AnimalStatusType;
  user: Pick<UserResponse, "id" | "name">;
  createdAt: string;
  updatedAt: string;
};

export default AdoptionType;
