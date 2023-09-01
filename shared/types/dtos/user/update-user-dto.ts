import UserDTO from "./user-dto";

export type UpdateUserRequest = Partial<
  UserDTO & {
    id: string;
  }
>;
