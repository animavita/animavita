import { AdoptionType } from '@animavita/models';
import { Document } from 'mongoose';

export type IAdoption = AdoptionType & Document;
