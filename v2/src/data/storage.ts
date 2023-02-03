import { Entity } from "./entity";

export interface Storage<TEntity extends Entity> {
  getEntities(): Promise<ReadonlyArray<TEntity>>;
  save(entity: TEntity): Promise<void>;
}