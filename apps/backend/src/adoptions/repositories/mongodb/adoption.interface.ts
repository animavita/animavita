import { AdoptionType } from '@animavita/models';
import { Document } from 'mongoose';

import {
  Location,
  UserDocument,
} from '../../../user/repositories/mongodb/user.interface';

type IAdoptionUser = Pick<UserDocument, '_id' | 'name'>;

export type IAdoption = AdoptionType & {
  user: IAdoptionUser;
  location: Location;
};

export type AdoptionDocument = IAdoption & Document;
