export type Providers = 'facebook' | 'google' | 'apple';

export interface ProvidedBy {
  providedBy: Providers;
}

export interface Id extends ProvidedBy {
  id: string;
}

export interface ProvidersId extends ProvidedBy {
  id: string;
}

export interface Email extends ProvidedBy {
  email: string;
}

export interface ProfileImage extends ProvidedBy {
  url: string;
}

interface UserData {
  id: string;
  providersIds: ProvidersId[];
  name: string;
  emails: Email[];
  profileImages: ProfileImage[];
}

export default class User {
  id: string;

  providersIds: ProvidersId[];

  name: string;

  emails: Email[];

  profileImages: ProfileImage[];

  constructor({id, providersIds, emails, name, profileImages}: UserData) {
    this.id = id;
    this.providersIds = providersIds;
    this.emails = emails;
    this.name = name;
    this.profileImages = profileImages;
  }
}
