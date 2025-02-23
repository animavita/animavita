import { Email } from '../email/email';
import Location from '../location/location';
import { HasherService } from '../services/hasher.service';

interface Attributes {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUri?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export class User {
  readonly id: string;
  private _name: string;
  private _email: Email;
  private _hashedPassword: string;
  private _photoUri?: string;
  private _location: Location;

  private constructor(attributes: Attributes) {
    this.id = attributes.id;
    this._name = attributes.name;
    this._email = Email.create(attributes.email);
    this._hashedPassword = attributes.password;
    this._photoUri = attributes.photoUri;
    this._location = new Location(
      attributes.location.longitude,
      attributes.location.latitude,
    );
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email.getValue();
  }

  get photoUri() {
    return this._photoUri;
  }

  get location() {
    return this._location.getValue();
  }

  verifyPassword(plainPassword: string, hasher: HasherService) {
    return hasher.compare(plainPassword, this._hashedPassword);
  }

  static create(attributes: Attributes) {
    return new User(attributes);
  }
}
