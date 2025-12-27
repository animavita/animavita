import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { AdoptionRequest } from '../../core/domain/adoption-request/adoption-request';
import AdoptionRequestRepository from '../../core/application/repositories/adoption-request.repository';
import {
  MongoAdoptionRequest,
  AdoptionRequestDocument,
} from '../mongo/schemas/adoption-request.schema';

@Injectable()
export class MongoAdoptionRequestRepository
  implements AdoptionRequestRepository
{
  constructor(
    @InjectModel(MongoAdoptionRequest.name)
    private readonly adoptionRequestModel: Model<AdoptionRequestDocument>,
  ) {}

  async getById(_id: string): Promise<AdoptionRequest> {
    if (!isValidObjectId(_id)) return null;

    const document = await this.adoptionRequestModel.findOne({ _id });

    if (!document) return null;

    return AdoptionRequest.create({
      id: document.id,
      petId: document.petId,
      adopterId: document.adopterId,
      status: document.status,
    });
  }

  async getByPetAndAdopter(
    petId: string,
    adopterId: string,
  ): Promise<AdoptionRequest | null> {
    if (!isValidObjectId(petId) || !isValidObjectId(adopterId)) return null;

    const document = await this.adoptionRequestModel.findOne({
      petId,
      adopterId,
    });

    if (!document) return null;

    return AdoptionRequest.create({
      id: document.id,
      petId: document.petId,
      adopterId: document.adopterId,
      status: document.status,
    });
  }

  async store(request: AdoptionRequest) {
    const doc: MongoAdoptionRequest = {
      petId: request.petId,
      adopterId: request.adopterId,
      status: request.status,
    };

    const existingDoc = await this.adoptionRequestModel.findById(request.id);

    let id: string;

    if (!existingDoc) {
      const newDocument = new this.adoptionRequestModel(doc);
      await newDocument.save();
      id = newDocument.id;
    } else {
      await this.adoptionRequestModel.findByIdAndUpdate(existingDoc.id, doc, {
        upsert: true,
      });
      id = existingDoc.id;
    }

    return {
      id,
    };
  }
}
