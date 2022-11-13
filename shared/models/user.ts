export type Coordinates = { latitude: number; longitude: number };

export type UserType = {
  id?: string;
  name: string;
  email: string;
  password: string;
  location: Coordinates;
  photoUri: string;
  refreshToken?: string;
};

export default UserType;
