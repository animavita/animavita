import { CredentialsType } from "../auth";

export type Coordinates = { latitude: number; longitude: number };

export type UserType = {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  location?: Coordinates;
  photoUri?: string;
  refreshToken?: CredentialsType["refreshToken"];
};

export type UserResponse = UserType & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export default UserType;
