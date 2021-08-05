import container from '../../../../shared/container';
import User from '../../domain/User';

export interface AuthenticateFbUserMutationArgs {
  token: string;
  expires: number;
  permissions: string[];
}

export interface AuthenticateFacebookUserResponse {
  user: User.Type;
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

    return {
      user,
      token,
    };
  },
};

export default facebookSessionController;
