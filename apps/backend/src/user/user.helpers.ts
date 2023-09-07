import { UserType } from '@animavita/types';

export const getCoordinatesFromUser = (user: UserDTO) =>
  Object.values(user.location);
