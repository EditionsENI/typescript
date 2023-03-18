export interface IEntity {
  id: string;
}

export interface IStorage<TEntity extends IEntity> {
  getEntities(): Promise<ReadonlyArray<TEntity>>;
  save(entity: TEntity): Promise<void>;
}
