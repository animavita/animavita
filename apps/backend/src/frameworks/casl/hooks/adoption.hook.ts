import { Injectable } from '@nestjs/common';
import { SubjectBeforeFilterHook, Request } from 'nest-casl';

import { DataServices } from '../../../core/abstracts/data-services.abstract';
import { PopulatedAdoptionEntity } from '../../../adoption/repositories/adoption-repository.interface';

@Injectable()
export class AdoptionHook
  implements SubjectBeforeFilterHook<PopulatedAdoptionEntity, Request>
{
  constructor(readonly dataServices: DataServices) {}

  async run({ body }: Request) {
    const actualSubject = await this.dataServices.adoptions.findById(body.id);

    return actualSubject;
  }
}
