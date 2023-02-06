export interface IEntity {
  id: string;
}

export interface Storage<TEntity extends IEntity> {
  getEntities(): Promise<ReadonlyArray<TEntity>>;
  save(entity: TEntity): Promise<void>;
}