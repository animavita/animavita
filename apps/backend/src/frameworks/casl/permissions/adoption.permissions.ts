import { Actions, Permissions } from 'nest-casl';

import { Roles } from '../app.roles';

export const AdoptionSubject = 'Adoption';

export const adoptionPermissions: Permissions<
  Roles,
  typeof AdoptionSubject,
  Actions
> = {
  user({ user, can }) {
    can(Actions.manage, AdoptionSubject, { 'user.id': user.id });
  },
};
