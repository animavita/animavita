import { MongoLocation } from 'src/user/repositories/mongodb/user-mongo.schema';
import {
  AdoptionEntity,
  PopulatedAdoptionEntity,
} from '../adoption-repository.interface';
import {
  MongoAdoption,
  PopulatedAdoptionDocument,
} from './adoption-mongo.schema';
import { MongoMapper } from 'src/frameworks/data-services/mongo-generic.map';

export const AdoptionMap: MongoMapper<PopulatedAdoptionEntity, MongoAdoption> =
  {
    toType(document: PopulatedAdoptionDocument): PopulatedAdoptionEntity {
      return {
        id: document._id.toString(),
        name: document.name,
        age: document.age,
        breed: document.breed,
        gender: document.gender,
        location: {
          longitude: document.location.coordinates[0],
          latitude: document.location.coordinates[1],
        },
        observations: document.observations,
        photos: document.photos,
        size: document.size,
        type: document.type,
        user: document.user._id
          ? {
              id: document.user._id.toString(),
              name: document.user.name,
            }
          : undefined,
        createdAt: document.createdAt as string,
        updatedAt: document.updatedAt as string,
      };
    },

    toSchema(adoption: AdoptionEntity): MongoAdoption {
      let location: MongoLocation;

      if (adoption.location?.longitude && adoption.location?.latitude) {
        location = {
          type: 'Point',
          coordinates: [
            adoption.location.longitude,
            adoption.location.latitude,
          ],
        };
      }

      return {
        name: adoption.name,
        age: adoption.age,
        breed: adoption.breed,
        gender: adoption.gender,
        size: adoption.size,
        type: adoption.type,
        observations: adoption.observations,
        photos: adoption.photos,
        location,
        user: adoption.user,
      };
    },
  };
