import { randomUUID } from 'crypto';
import Size from './size';
import PetGender from './gender/gender';
import PetType from './type/type';

interface Attributes {
  id?: string;
  name: string;
  breed: string;
  age: string;
  type: string;
  gender: string;
  size: string;
  observations: string;
  photos: string[];
  ownerId: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export class Pet {
  readonly id: string;
  readonly name: string;
  readonly breed: string;
  readonly age: 'puppy' | 'young' | 'adult' | 'senior';
  readonly type: PetType;
  readonly gender: PetGender;
  readonly size: Size;
  readonly observations: string;
  readonly photos: string[];
  readonly ownerId: string;
  readonly location: {
    longitude: number;
    latitude: number;
  };

  private constructor(attributes: Attributes) {
    this.id = attributes.id || randomUUID();
    this.name = attributes.name;
    this.breed = attributes.breed;
    this.age = attributes.age as any;
    this.type = new PetType(attributes.type);
    this.gender = new PetGender(attributes.gender);
    this.size = new Size(attributes.size);
    this.observations = attributes.observations || '';
    this.photos = attributes.photos || [];
    this.ownerId = attributes.ownerId;
    this.location = attributes.location;
  }

  static create(attributes: Attributes) {
    return new Pet(attributes);
  }
}
