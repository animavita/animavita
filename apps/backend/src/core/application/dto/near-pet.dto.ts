export interface NearPet {
  id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  location: {
    longitude: number;
    latitude: number;
  };
  observations: string;
  photos: string[];
  size: string;
  type: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
