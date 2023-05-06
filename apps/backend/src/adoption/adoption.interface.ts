import { AdoptionType } from '@animavita/models';
import { Location } from '../user/repositories/mongodb/user.interface';

export type AdoptionDto = AdoptionType;

export type AdoptionResponse = AdoptionType & {
  user: {
    id: string;
    name: string;
  };
  location: Location;
};
