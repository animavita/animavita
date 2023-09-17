import { Model } from 'mongoose';
import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';
import { MongoMapper } from './mongo-generic.map';

export class MongoGenericRepository<MongoModel, Entity, EntityPopulated>
  implements GenericRepository<Entity, EntityPopulated>
{
  private _repository: Model<MongoModel>;
  private _populateOnFind: string[];
  private _Mapper: MongoMapper<EntityPopulated, MongoModel>;

  constructor(
    repository: Model<MongoModel>,
    populateOnFind: string[] = [],
    mapper: MongoMapper<EntityPopulated, MongoModel>,
  ) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
    this._Mapper = mapper;
  }

  async findAll(): Promise<EntityPopulated[]> {
    const documents = await this._repository
      .find()
      .populate(this._populateOnFind);

    return documents.map(this._Mapper.toType);
  }

  async findById(_id: string): Promise<EntityPopulated> {
    const document = await this._repository
      .findOne({ _id })
      .populate(this._populateOnFind);

    if (!document) return null;

    return this._Mapper.toType(document);
  }

  async create(item: Entity): Promise<EntityPopulated> {
    const newDocument = new this._repository(this._Mapper.toSchema(item));

    const document = await newDocument
      .save()
      .then((doc) => doc.populate(this._populateOnFind));

    return this._Mapper.toType(document);
  }

  async update(_id: string, item: Entity): Promise<EntityPopulated> {
    const document = await this._repository
      .findOneAndUpdate({ _id }, { $set: item }, { new: true })
      .populate(this._populateOnFind);

    return this._Mapper.toType(document);
  }

  async delete(_id: string): Promise<EntityPopulated> {
    const document = await this._repository
      .findOneAndDelete({ _id })
      .populate(this._populateOnFind)
      .exec();

    return this._Mapper.toType(document);
  }
}
