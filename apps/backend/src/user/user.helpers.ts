import { UserType } from '@animavita/models';

export const getCoordinatesFromUser = (user: UserType) =>
  Object.values(user.location);
