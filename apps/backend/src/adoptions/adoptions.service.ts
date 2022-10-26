import { AdoptionType } from '@animavita/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdoptionsService {
  async getAdoptions(): Promise<AdoptionType[]> {
    return [
      {
        age: 5,
        breed: 'Labrador',
        gender: 'male',
        name: 'Marley',
        observations: '',
        photos: [],
        size: 'big',
        type: 'dog',
      },
    ];
  }
}
