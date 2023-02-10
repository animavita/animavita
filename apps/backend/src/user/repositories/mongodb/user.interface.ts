import { Document } from 'mongoose';

type LocationType = 'Point';
export type Location = {
  type?: LocationType;
  coordinates: number[];
};

export type IUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  location: Location;
  photoUri?: string;
  refreshToken?: string;
};

export type UserDocument = IUser & Document;
