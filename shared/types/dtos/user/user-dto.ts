import { CredentialsDTO } from "../auth";

export type Coordinates = { latitude: number; longitude: number };

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  location: Coordinates;
  photoUri?: string;
  refreshToken?: CredentialsDTO["refreshToken"];
};

export type UserResponse = UserDTO & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export default UserDTO;
