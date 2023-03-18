import { Inject } from "../ioc/inject";
import { IEntity, IStorage } from "./types";
import * as uuid from 'uuid';

export class Repository<TEntity extends IEntity> {
  @Inject
  #storage!: IStorage<TEntity>;

  async retreiveAll() {
    return this.#storage.getEntities();
  }

  async create(entityWithoutId: Omit<TEntity, 'id'>) {
    const entity = {
      ...entityWithoutId,
      id: uuid.v4()
    };
    await this.#storage.save(entity as TEntity);
  }
} 