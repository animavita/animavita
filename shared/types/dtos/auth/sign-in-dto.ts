import { CredentialsDTO } from "./auth-dto";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = CredentialsDTO & {
  name: string;
};
