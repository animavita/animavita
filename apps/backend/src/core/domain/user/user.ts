import { Email } from '../email/email';
import Location from '../location/location';
import { HasherService } from '../services/hasher.service';

export type Role = 'admin' | 'adopter' | 'owner';

export interface Attributes {
  id: string;
  name: string;
  email: Email;
  password: string;
  phoneNumber?: string;
  photoUri?: string;
  role?: Role;
  location?: Location;
}

export class User {
  readonly id: string;
  private _name: string;
  private _email: Email;
  private _role: Role;
  private _hashedPassword: string;
  private _phoneNumber?: string;
  private _photoUri?: string;
  private _location?: Location;

  private constructor(attributes: Attributes) {
    this.id = attributes.id;
    this._name = attributes.name;
    this._email = attributes.email;
    this._hashedPassword = attributes.password;
    this._phoneNumber = attributes.phoneNumber;
    this._photoUri = attributes.photoUri;

    if (attributes.role) {
      this._role = attributes.role;
    }

    if (attributes.location) {
      this._location = attributes.location;
    }
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email.getValue();
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get photoUri() {
    return this._photoUri;
  }

  get location() {
    return this._location?.getValue();
  }

  get role() {
    return this._role;
  }

  get isOwner() {
    return this._role === 'owner';
  }

  get isAdopter() {
    return this._role === 'adopter';
  }

  get isAdmin() {
    return this._role === 'admin';
  }

  verifyPassword(plainPassword: string, hasher: HasherService) {
    return hasher.compare(plainPassword, this._hashedPassword);
  }

  setLocation(location: Location) {
    this._location = location;
  }

  assignRole(role: string) {
    if (!['adopter', 'owner'].includes(role)) {
      throw new Error('Invalid role assignment');
    }

    this._role = role as Role;
  }

  static create(attributes: Attributes) {
    return new User(attributes);
  }
}
