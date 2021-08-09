import {nodeDefinitions} from 'graphql-relay';
import {GraphQLObjectType} from 'graphql';

type RegisteredTypes = {
  [key: string]: GraphQLObjectType;
};
const registeredTypes: RegisteredTypes = {};

export function registerType(type: GraphQLObjectType) {
  registeredTypes[type.name] = type;
  return type;
}

export const {nodeField, nodeInterface: NodeInterface} = nodeDefinitions(
  () => null,
  object => registeredTypes[object.registeredType] || null,
);
