import { Injectable } from '@nestjs/common';
import { UserBeforeFilterHook } from 'nest-casl';

import { DataServices } from '../../../core/abstracts/data-services.abstract';

@Injectable()
export class UserHook implements UserBeforeFilterHook<any> {
  constructor(readonly dataServices: DataServices) {}

  async run(user) {
    const dbUser = await this.dataServices.users.findByEmail(user.email);

    // TO DO: https://github.com/animavita/animavita/issues/204
    // since nest-casl is RBAC, we need to generate an array of roles.
    // for Animavita, we have three different roles:
    //
    // Admin -> Super user
    // Owner -> The user who has created adoptions
    // User  -> The user who is looking for pets to adopt (hasn't created adoptions)

    return {
      ...dbUser,
      roles: ['user'],
    };
  }
}
