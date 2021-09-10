import container from '../../../../shared/container';
import {UserGraphQLType} from '../UserType';
import {transformDomainUserIntoPresentationUser} from '../../utils';
export interface AuthenticateFbUserMutationArgs {
  token: string;
  expires: number;
  permissions: string[];
}

export interface AuthenticateFacebookUserResponse {
  user: UserGraphQLType;
  token: string;
}

const facebookSessionController = {
  async create({
    expires,
    permissions,
    token: jwtToken,
  }: AuthenticateFbUserMutationArgs): Promise<AuthenticateFacebookUserResponse> {
    const authenticateFacebookUser = container.cradle.authenticateFacebookUser;

    const {user, token} = await authenticateFacebookUser({
      expires,
      permissions,
      token: jwtToken,
    });

    const displayUser = transformDomainUserIntoPresentationUser(user);

    return {
      user: displayUser,
      token,
    };
  },
};

export default facebookSessionController;
