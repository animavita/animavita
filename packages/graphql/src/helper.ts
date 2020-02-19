import DataLoader from 'dataloader';

interface LoaderFactory<T extends DataLoader<any, any>> {
  getLoader: () => T;
}

interface LoaderFactoryMap {
  [key: string]: LoaderFactory<any>;
}

export type ResolvedLoaders<T extends LoaderFactoryMap> = {[K in keyof T]: ReturnType<T[K]['getLoader']>};

export function getDataloaders<T extends LoaderFactoryMap>(loaders: T): ResolvedLoaders<T> {
  const result: ResolvedLoaders<T> = {} as any;
  for (const key in loaders) {
    if (loaders[key].getLoader) {
      result[key] = loaders[key].getLoader();
    }
  }
  return result;
}
