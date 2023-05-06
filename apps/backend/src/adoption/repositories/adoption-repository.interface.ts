import { AdoptionType, UserType } from '@animavita/models';
import { AdoptionResponse } from '../adoption.interface';
import { Location } from '../../user/repositories/mongodb/user.interface';

export type IAdoption = AdoptionType & {
  user: string;
  location: Location;
};

export type FindNearestType = {
  coordinates: number[];
  radius: number;
  currentUser: UserType;
};

export interface AdoptionRepository {
  create: (adoption: IAdoption) => Promise<AdoptionResponse>;
  update: (adoption: Partial<IAdoption>) => Promise<AdoptionResponse>;
  findAll: () => Promise<AdoptionResponse[]>;
  findNearest: (args: FindNearestType) => Promise<AdoptionResponse[]>;
  getById: (id: string) => Promise<AdoptionResponse>;
  delete: (id: string) => Promise<AdoptionResponse>;
}
