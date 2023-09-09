import UserType from "./user-dto";

export type UpdateUserRequest = Partial<
  UserType & {
    id: string;
  }
>;
