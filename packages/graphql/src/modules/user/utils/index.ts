import User from '../domain/User';
import {UserGraphQLType} from '../presentation/UserType';

export const transformDomainUserIntoPresentationUser = (user: User.Type): UserGraphQLType => {
  const lastLoggedInProvider = user.providers.sort(provider => provider.lastLogIn)[0];

  return {
    id: user.id,
    name: lastLoggedInProvider.name,
    email: lastLoggedInProvider.email,
    profileImage: lastLoggedInProvider.profileImage,
  };
};
