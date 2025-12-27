import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdoptionRequestDao } from '../../core/application/dao/adoption-request.dao';
import {
  MongoAdoptionRequest,
  AdoptionRequestDocument,
} from '../mongo/schemas/adoption-request.schema';
import { AdoptionRequestDto } from '../../core/application/dto/adoption-request.dto';

type AdoptionRequestWithPet = AdoptionRequestDocument & {
  pet: {
    _id: string;
    name: string;
    breed: string;
    type: string;
  };
};

type AdoptionRequestWithAdopter = AdoptionRequestDocument & {
  adopter: {
    _id: string;
    name: string;
  };
};

type AdoptionRequestWithPetOwner = AdoptionRequestDocument & {
  pet: {
    _id: string;
    name: string;
    breed: string;
    type: string;
    user: string;
  };
};

@Injectable()
export class MongoAdoptionRequestDAO implements AdoptionRequestDao {
  constructor(
    @InjectModel(MongoAdoptionRequest.name)
    private readonly adoptionRequestModel: Model<AdoptionRequestDocument>,
  ) {}

  async getByAdopter(adopterId: string): Promise<AdoptionRequestDto[]> {
    const documents = await this.adoptionRequestModel
      .find({ adopterId })
      .populate<{ petId: AdoptionRequestWithPet['pet'] }>(
        'petId',
        'name breed type',
      )
      .populate<{ adopterId: AdoptionRequestWithAdopter['adopter'] }>(
        'adopterId',
        'name',
      )
      .sort({ createdAt: -1 });

    return documents.map((doc) => {
      const petData = doc.petId as any;
      const adopterData = doc.adopterId as any;
      return {
        id: doc._id.toString(),
        petId:
          typeof doc.petId === 'string' ? doc.petId : petData._id?.toString(),
        adopterId:
          typeof doc.adopterId === 'string'
            ? doc.adopterId
            : adopterData._id?.toString(),
        status: doc.status,
        createdAt: doc.createdAt.toString(),
        updatedAt: doc.updatedAt.toString(),
        pet: {
          id: petData._id.toString(),
          name: petData.name,
          breed: petData.breed,
          type: petData.type,
        },
        adopter: {
          id: adopterData._id.toString(),
          name: adopterData.name,
        },
      };
    });
  }

  async getByOwner(ownerId: string): Promise<AdoptionRequestDto[]> {
    const documents = await this.adoptionRequestModel
      .find()
      .populate<{ petId: AdoptionRequestWithPetOwner['pet'] }>(
        'petId',
        'name breed type user',
      )
      .populate<{ adopterId: AdoptionRequestWithAdopter['adopter'] }>(
        'adopterId',
        'name',
      )
      .sort({ createdAt: -1 });

    const filtered = documents.filter((doc) => {
      const petData = doc.petId as any;
      return (
        petData &&
        typeof petData === 'object' &&
        petData.user?.toString() === ownerId
      );
    });

    return filtered.map((doc) => {
      const petData = doc.petId as any;
      const adopterData = doc.adopterId as any;
      return {
        id: doc._id.toString(),
        petId:
          typeof doc.petId === 'string' ? doc.petId : petData._id?.toString(),
        adopterId:
          typeof doc.adopterId === 'string'
            ? doc.adopterId
            : adopterData._id?.toString(),
        status: doc.status,
        createdAt: doc.createdAt.toString(),
        updatedAt: doc.updatedAt.toString(),
        pet: {
          id: petData._id.toString(),
          name: petData.name,
          breed: petData.breed,
          type: petData.type,
        },
        adopter: {
          id: adopterData._id.toString(),
          name: adopterData.name,
        },
      };
    });
  }

  async getRequestedPetIds(adopterId: string): Promise<string[]> {
    const documents = await this.adoptionRequestModel
      .find({ adopterId })
      .select('petId')
      .lean();

    return documents.map((doc) => doc.petId.toString());
  }
}
