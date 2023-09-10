import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CHECK_ABILITY_KEY,
  RequiredRule,
} from '../frameworks/casl/ability.decorator';
import { AbilityFactory } from '../frameworks/casl/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { DataServices } from 'src/core/abstracts/data-services.abstract';
import { subject as an } from '@casl/ability';

const dbModelsSubjectsMapping = {
  Adoption: 'adoptions',
};

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
    private dataServices: DataServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(
        CHECK_ABILITY_KEY,
        context.getHandler(),
      ) || [];

    const { user: currentUser, body } = context.switchToHttp().getRequest();

    const user = await this.dataServices.users.findById(currentUser.sub);

    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      for (const rule of rules) {
        const actualSubject = await this.getSubjectById(
          body.id,
          dbModelsSubjectsMapping[rule.subject as string],
        );

        ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          an(rule.subject as string, actualSubject),
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  private async getSubjectById(id: string, subName: string) {
    const subject = await this.dataServices[subName].findById(id);

    if (!subject) throw new NotFoundException(`${subName} not found`);

    return subject;
  }
}
