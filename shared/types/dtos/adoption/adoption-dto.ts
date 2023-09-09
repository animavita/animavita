import { UserResponse } from "../user";

export type AnimalGendersType = "male" | "female";
export type AnimalType = "dog" | "cat" | "other";
export type AnimalSizesType = "small" | "medium" | "big";
export type AnimalAgesType = "puppy" | "young" | "adult" | "senior";

export type AdoptionType = {
  name: string;
  gender: AnimalGendersType;
  breed: string;
  type: AnimalType;
  age: AnimalAgesType;
  size: AnimalSizesType;
  observations: string;
  photos: string[];
};

export type AdoptionResponse = AdoptionType & {
  id: string;
  user: Pick<UserResponse, "id" | "name">;
  createdAt: string;
  updatedAt: string;
};

export default AdoptionType;
