import { CredentialsType } from "./auth-dto";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = CredentialsType & {
  name: string;
};
