import { IEntity, IStorage } from "./types";
import * as uuid from 'uuid';
import { Inject } from "../ioc/inject";

export class Repository<TEntity extends IEntity> {
  @Inject
  readonly #storage!: IStorage<TEntity>;

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
