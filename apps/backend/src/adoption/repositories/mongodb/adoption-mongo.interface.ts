import * as mongoose from 'mongoose';

import { UserDocument } from '../../../user/repositories/mongodb/user.interface';

import { IAdoption } from '../adoption-repository.interface';

export type AdoptionDocument = Omit<IAdoption, 'user'> & {
  user: Pick<UserDocument, '_id' | 'name'>;
} & mongoose.Document;
