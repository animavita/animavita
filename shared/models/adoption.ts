export type AnimalGendersType = "male" | "female";
export type AnimalType = "dog" | "cat" | "other";
export type AnimalSizesType = "small" | "medium" | "big";

export type AdoptionType = {
  id?: string;
  name: string;
  gender: AnimalGendersType;
  breed: string;
  type: AnimalType;
  age: number;
  size: AnimalSizesType;
  observations: string;
  photos: string[];
};

export default AdoptionType;
