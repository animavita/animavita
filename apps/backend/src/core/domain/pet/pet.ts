import PetSize, { PetSizeType } from './size/size';
import PetGender, { PetGenderType } from './gender/gender';
import PetType, { PetTypeType } from './type/type';
import PetAge, { PetAgeType } from './age/age';
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

type UpdatableAttributes = Partial<
  Omit<Attributes, 'id' | 'ownerId' | 'location'>
>;

export class Pet {
  readonly id: string;
  private _name: string;
  private _breed: string;
  private _observations: string;
  private _photos: string[];
  readonly ownerId: string;
  private _age: PetAge;
  private _type: PetType;
  private _gender: PetGender;
  private _size: PetSize;
  readonly location: Location;

  private constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.breed = attributes.breed;
    this.observations = attributes.observations || '';
    this.photos = attributes.photos || [];
    this.ownerId = attributes.ownerId;
    this.age = attributes.age;
    this.type = attributes.type;
    this.gender = attributes.gender;
    this.size = attributes.size;
    this.location = new Location(
      attributes.location.longitude,
      attributes.location.latitude,
    );
  }

  private set name(aName: string) {
    this._name = aName;
  }

  get name() {
    return this._name;
  }

  private set breed(aBreed: string) {
    this._breed = aBreed;
  }

  get breed() {
    return this._breed;
  }

  private set observations(observations: string) {
    this._observations = observations;
  }

  get observations() {
    return this._observations;
  }

  private set photos(photos: string[]) {
    this._photos = photos;
  }

  get photos() {
    return this._photos;
  }

  private set age(anAge: string) {
    this._age = new PetAge(anAge);
  }

  get age(): PetAgeType {
    return this._age.getValue();
  }

  private set type(aType: string) {
    this._type = new PetType(aType);
  }

  get type(): PetTypeType {
    return this._type.getValue();
  }

  private set gender(aGender: string) {
    this._gender = new PetGender(aGender);
  }

  get gender(): PetGenderType {
    return this._gender.getValue();
  }

  private set size(aSize: string) {
    this._size = new PetSize(aSize);
  }

  get size(): PetSizeType {
    return this._size.getValue();
  }

  update({
    name,
    breed,
    age,
    gender,
    size,
    type,
    observations,
    photos,
  }: UpdatableAttributes) {
    if (name) this.name = name;
    if (breed) this.breed = breed;
    if (age) this.age = age;
    if (gender) this.gender = gender;
    if (size) this.size = size;
    if (type) this.type = type;
    if (observations) this.observations = observations;
    if (photos) this.photos = photos;
  }

  static create(attributes: Attributes) {
    return new Pet(attributes);
  }
}
