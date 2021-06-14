import {AwilixContainer} from 'awilix';

import * as StorageProvider from './StorageProvider';

export type Container = StorageProvider.Container;

export const register = (container: AwilixContainer) => {
  StorageProvider.register(container);
};
