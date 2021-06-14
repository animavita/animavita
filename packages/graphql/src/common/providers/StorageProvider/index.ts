import {asClass, AwilixContainer} from 'awilix';

import StorageProvider from './models/StorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

export type Container = {
  storageProvider: StorageProvider;
};

export const register = (container: AwilixContainer) =>
  container.register({
    storageProvider: asClass(S3StorageProvider).singleton(),
  });
