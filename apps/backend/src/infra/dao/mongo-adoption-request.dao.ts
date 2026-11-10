import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { AdoptionRequestDao } from '../../core/application/dao/adoption-request.dao';
import {
  MongoAdoptionRequest,
  AdoptionRequestDocument,
} from '../mongo/schemas/adoption-request.schema';
import { AdoptionRequestDto } from '../../core/application/dto/adoption-request.dto';

@Injectable()
export class MongoAdoptionRequestDAO implements AdoptionRequestDao {
  constructor(
    @InjectModel(MongoAdoptionRequest.name)
    private readonly adoptionRequestModel: Model<AdoptionRequestDocument>,
  ) {}

  private buildLookupAndProjectPipeline(options?: {
    filterByPetOwner?: string;
  }): PipelineStage[] {
    const stages: PipelineStage[] = [
      {
        $addFields: {
          petIdAsObjectId: { $toObjectId: '$petId' },
          adopterIdAsObjectId: { $toObjectId: '$adopterId' },
        },
      },
      {
        $lookup: {
          from: 'pets',
          localField: 'petIdAsObjectId',
          foreignField: '_id',
          as: 'petData',
        },
      },
      {
        $unwind: {
          path: '$petData',
          preserveNullAndEmptyArrays: false,
        },
      },
    ];

    if (options?.filterByPetOwner) {
      stages.push({
        $match: {
          $expr: {
            $eq: [{ $toString: '$petData.user' }, options.filterByPetOwner],
          },
        },
      });
    }

    stages.push(
      {
        $addFields: {
          ownerIdAsObjectId: { $toObjectId: '$petData.user' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'adopterIdAsObjectId',
          foreignField: '_id',
          as: 'adopterData',
        },
      },
      {
        $unwind: {
          path: '$adopterData',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'ownerIdAsObjectId',
          foreignField: '_id',
          as: 'ownerData',
        },
      },
      {
        $unwind: {
          path: '$ownerData',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          petId: 1,
          adopterId: 1,
          status: 1,
          denialReason: 1,
          createdAt: 1,
          updatedAt: 1,
          pet: {
            _id: '$petData._id',
            name: '$petData.name',
            breed: '$petData.breed',
            type: '$petData.type',
            owner: {
              _id: '$ownerData._id',
              name: '$ownerData.name',
            },
          },
          adopter: {
            _id: '$adopterData._id',
            name: '$adopterData.name',
          },
        },
      },
    );

    return stages;
  }

  private mapToDto(doc: any): AdoptionRequestDto {
    return {
      id: doc._id.toString(),
      petId: doc.petId.toString(),
      adopterId: doc.adopterId.toString(),
      status: doc.status,
      denialReason: doc.denialReason ?? null,
      createdAt: doc.createdAt.toString(),
      updatedAt: doc.updatedAt.toString(),
      pet: {
        id: doc.pet._id.toString(),
        name: doc.pet.name,
        breed: doc.pet.breed,
        type: doc.pet.type,
        owner: {
          id: doc.pet.owner._id.toString(),
          name: doc.pet.owner.name,
        },
      },
      adopter: {
        id: doc.adopter._id.toString(),
        name: doc.adopter.name,
      },
    };
  }

  async getByAdopter(adopterId: string): Promise<AdoptionRequestDto[]> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          adopterId,
        },
      },
      ...this.buildLookupAndProjectPipeline(),
    ];

    const documents = await this.adoptionRequestModel.aggregate(pipeline);
    return documents.map((doc) => this.mapToDto(doc));
  }

  async getByOwner(ownerId: string): Promise<AdoptionRequestDto[]> {
    const pipeline: PipelineStage[] = [
      ...this.buildLookupAndProjectPipeline({ filterByPetOwner: ownerId }),
    ];

    const documents = await this.adoptionRequestModel.aggregate(pipeline);
    return documents.map((doc) => this.mapToDto(doc));
  }

  async getRequestedPetIds(adopterId: string): Promise<string[]> {
    const documents = await this.adoptionRequestModel
      .find({ adopterId })
      .select('petId')
      .lean();

    return documents.map((doc) => doc.petId.toString());
  }
}
