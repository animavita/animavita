import { Actions, Permissions } from 'nest-casl';

import { Roles } from '../app.roles';

export type AdoptionSubjects = 'Adoption';

export const adoptionPermissions: Permissions<
  Roles,
  AdoptionSubjects,
  Actions
> = {
  user({ user, can }) {
    can(Actions.manage, 'Adoption', { 'user.id': user.id });
  },
};
