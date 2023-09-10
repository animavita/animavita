import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { PopulatedAdoptionEntity } from 'src/adoption/repositories/adoption-repository.interface';
import { UserEntity } from 'src/user/repositories/user-repository.interface';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<PopulatedAdoptionEntity | 'Adoption'>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Manage, 'Adoption', { 'user.id': user.id });

    return build();
  }
}
