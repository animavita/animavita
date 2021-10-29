type DataMapper<AR, DATA> = {
  toEntity(data: DATA): AR;
  toData(entity: AR): DATA;
};

export {DataMapper};
