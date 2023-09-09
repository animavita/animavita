import { Model } from 'mongoose';
import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';
import { MongoMapper } from './mongo-generic-mapper';

export class MongoGenericRepository<T, TPopulated>
  implements GenericRepository<T, TPopulated>
{
  private _repository: Model<T>;
  private _populateOnFind: string[];
  private _Mapper: MongoMapper<TPopulated, T>;

  constructor(
    repository: Model<T>,
    populateOnFind: string[] = [],
    mapper: MongoMapper<TPopulated, T>,
  ) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
    this._Mapper = mapper;
  }

  async findAll(): Promise<TPopulated[]> {
    const documents = await this._repository
      .find()
      .populate(this._populateOnFind);

    return documents.map(this._Mapper.toType);
  }

  async findById(_id: string): Promise<TPopulated> {
    const document = await this._repository
      .findOne({ _id })
      .populate(this._populateOnFind);

    if (!document) return null;

    return this._Mapper.toType(document);
  }

  async create(item: T): Promise<TPopulated> {
    const newDocument = new this._repository(this._Mapper.toSchema(item));

    const document = await newDocument
      .save()
      .then((doc) => doc.populate(this._populateOnFind));

    return this._Mapper.toType(document);
  }

  async update(_id: string, item: T): Promise<TPopulated> {
    const document = await this._repository
      .findOneAndUpdate({ _id }, { $set: item }, { new: true })
      .populate(this._populateOnFind);

    return this._Mapper.toType(document);
  }

  async delete(_id: string): Promise<TPopulated> {
    const document = await this._repository
      .findOneAndDelete({ _id })
      .populate(this._populateOnFind)
      .exec();

    return this._Mapper.toType(document);
  }
}
