namespace User {
  type Providers = 'facebook' | 'google' | 'apple';

  type ProvidedBy = Readonly<{
    providedBy: Providers;
  }>;

  export type ProviderId = ProvidedBy &
    Readonly<{
      id: string;
    }>;

  export type Email = ProvidedBy &
    Readonly<{
      email: string;
    }>;

  export type ProfileImage = ProvidedBy &
    Readonly<{
      url: string;
    }>;

  type UserData = Readonly<{
    id: string;
    providersIds: ProviderId[];
    name: string;
    emails: Email[];
    profileImages: ProfileImage[];
  }>;

  type User = Readonly<{
    id: string;
    name: string;
    emails: Email[];
    providersIds: ProviderId[];
    profileImages: ProfileImage[];
  }>;

  export const create = ({id, providersIds, emails, name, profileImages}: UserData): User => ({
    id,
    providersIds,
    emails,
    name,
    profileImages,
  });

  export const updateName = (self: User, name: string): User => {
    if (name.length !== self.name.length) {
      return {
        ...self,
        name,
      };
    }

    return self;
  };

  export const updateFacebookId = (self: User, facebookId: string): User => {
    const currentFacebookId = self.providersIds.find(id => id.providedBy === 'facebook');

    if (currentFacebookId?.id !== facebookId) {
      const updatedProvidersIds = self.providersIds.map(providerId =>
        providerId.providedBy === 'facebook' ? ({id: facebookId, providedBy: 'facebook'} as ProviderId) : providerId,
      );

      return {
        ...self,
        providersIds: updatedProvidersIds,
      };
    }

    return self;
  };

  export const updateFacebookProfileImage = (self: User, imageUrl: string | null): User => {
    if (imageUrl) {
      return {
        ...self,
        profileImages: [...self.profileImages, {url: imageUrl, providedBy: 'facebook'}],
      };
    }

    return self;
  };

  export const shouldUpdateFacebookProfileImage = (self: User): boolean => {
    const existingFbProfileImages = self.profileImages.find(profileImage => profileImage.providedBy === 'facebook');

    return !existingFbProfileImages || self.profileImages.length === 0;
  };

  export type Type = User;
}

export default User;
