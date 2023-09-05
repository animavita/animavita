import { UserDTO, UserResponse } from "../user";

export type AnimalGendersType = "male" | "female";
export type AnimalType = "dog" | "cat" | "other";
export type AnimalSizesType = "small" | "medium" | "big";
export type AnimalAgesType = "puppy" | "young" | "adult" | "senior";

export type AdoptionDTO = {
  name: string;
  gender: AnimalGendersType;
  breed: string;
  type: AnimalType;
  age: AnimalAgesType;
  size: AnimalSizesType;
  observations: string;
  photos: string[];
};

export type AdoptionResponse = AdoptionDTO & {
  id: string;
  user: Pick<UserResponse, "id" | "name">;
  createdAt: string;
  updatedAt: string;
};

export default AdoptionDTO;
