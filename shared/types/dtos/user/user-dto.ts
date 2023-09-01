export type Coordinates = { latitude: number; longitude: number };

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  location: Coordinates;
  photoUri?: string;
};

export type UserResponse = UserDTO & {
  id: string;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
};

export default UserDTO;
