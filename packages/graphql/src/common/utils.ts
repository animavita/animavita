import {Model, Types} from 'mongoose';
import {fromGlobalId} from 'graphql-relay';

// returns an ObjectId given an param of unknown type
export const getObjectId = (target: string | Model<any> | Types.ObjectId | undefined | null): Types.ObjectId | null => {
  if (!target) return null;

  if (target instanceof Types.ObjectId) {
    return new Types.ObjectId(target.toString());
  }

  if (typeof target === 'object') {
    return target._id ? new Types.ObjectId(target._id) : null;
  }

  if (typeof target === 'string') {
    const result = fromGlobalId(target);

    if (result.type && result.id && Types.ObjectId.isValid(result.id)) {
      return new Types.ObjectId(result.id);
    }

    if (Types.ObjectId.isValid(target)) {
      return new Types.ObjectId(target);
    }

    return null;
  }

  return null;
};
