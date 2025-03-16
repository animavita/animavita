import { Coordinates } from "../user";
import { CredentialsType } from "./auth-dto";

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  location?: Coordinates;
};

export type SignUpResponse = CredentialsType & {
  name: string;
};
