import { randomUUID } from 'crypto';
import PetSize from './size/size';
import PetGender from './gender/gender';
import PetType from './type/type';
import PetAge from './age/age';
import Location from '../location/location';

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
  readonly observations: string;
  readonly photos: string[];
  readonly ownerId: string;
  readonly age: PetAge;
  readonly type: PetType;
  readonly gender: PetGender;
  readonly size: PetSize;
  readonly location: Location;

  private constructor(attributes: Attributes) {
    this.id = attributes.id || randomUUID();
    this.name = attributes.name;
    this.breed = attributes.breed;
    this.observations = attributes.observations || '';
    this.photos = attributes.photos || [];
    this.ownerId = attributes.ownerId;
    this.age = new PetAge(attributes.age);
    this.type = new PetType(attributes.type);
    this.gender = new PetGender(attributes.gender);
    this.size = new PetSize(attributes.size);
    this.location = new Location(
      attributes.location.longitude,
      attributes.location.latitude,
    );
  }

  static create(attributes: Attributes) {
    return new Pet(attributes);
  }
}
