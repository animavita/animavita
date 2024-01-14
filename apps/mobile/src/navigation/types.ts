import { UserType } from '@animavita/types';

export type GetLocationScreenParamList = {
  GetLocation: {
    user: Pick<UserType, 'name' | 'email' | 'password'>;
  };
};
