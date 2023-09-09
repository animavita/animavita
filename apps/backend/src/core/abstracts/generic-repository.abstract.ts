export abstract class GenericRepository<T, TPopulated> {
  abstract findAll(): Promise<TPopulated[]>;

  abstract findById(id: string): Promise<TPopulated>;

  abstract create(
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TPopulated>;

  abstract update(
    id: string,
    item: Partial<Omit<T, 'createdAt' | 'updateAt'>>,
  ): Promise<TPopulated>;

  abstract delete(id: string): Promise<TPopulated>;
}
