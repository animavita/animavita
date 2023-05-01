import { AdoptionResponse } from '../../adoption.interface';
import { AdoptionDocument } from './adoption-mongo.interface';

export class AdoptionMap {
  static toType(adoption: AdoptionDocument): AdoptionResponse {
    return {
      id: adoption._id.toString(),
      name: adoption.name,
      age: adoption.age,
      breed: adoption.breed,
      gender: adoption.gender,
      location: adoption.location,
      observations: adoption.observations,
      photos: adoption.photos,
      size: adoption.size,
      type: adoption.type,
      user: {
        id: adoption.user._id,
        name: adoption.user.name,
      },
    };
  }
}
