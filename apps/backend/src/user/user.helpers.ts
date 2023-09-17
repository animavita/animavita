import { UserType } from '@animavita/types';

export const getCoordinatesFromUser = (user: UserType) =>
  Object.values(user.location);
