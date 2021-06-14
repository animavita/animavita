import {asFunction, AwilixContainer} from 'awilix';

import StorageProvider from './models/StorageProvider';
import s3StorageProvider from './implementations/s3StorageProvider';

export type Container = {
  storageProvider: StorageProvider;
};

export const register = (container: AwilixContainer) =>
  container.register({
    storageProvider: asFunction(s3StorageProvider).singleton(),
  });
