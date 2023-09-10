export interface MongoMapper<Type, Schema> {
  toType(schema: any): Type;
  toSchema(type: any): Schema;
}
