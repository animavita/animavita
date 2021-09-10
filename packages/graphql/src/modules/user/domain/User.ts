import Provider from './Provider';

namespace User {
  type User = Readonly<{
    id: string;
    providers: Provider.Type[];
  }>;

  export const create = ({id, providers}: User): User => ({
    id,
    providers,
  });

  export const syncProvider = (self: User, syncProvider: Provider.Type): User => {
    const existingProvider = self.providers.find(provider => provider.origin === syncProvider.origin);
    const providers = existingProvider
      ? self.providers.map(provider => (provider.origin === syncProvider.origin ? syncProvider : provider))
      : [...self.providers, syncProvider];

    return {
      ...self,
      providers,
    };
  };

  export const getProvider = (self: User, origin: Provider.Origin): Provider.Type | null => {
    const provider = self.providers.find(provider => provider.origin === origin);

    return provider ? provider : null;
  };

  export type Type = User;
}

export default User;
