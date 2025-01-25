export interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  size: string;
  type: string;
  observations: string;
  photos: string[];
}

export type NearPet = Pet & {
  location: {
    longitude: number;
    latitude: number;
  };
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};
