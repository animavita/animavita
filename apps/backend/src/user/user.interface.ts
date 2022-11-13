import { UserType } from '@animavita/models';
import { Document } from 'mongoose';

export type IUser = UserType & Document;
