import { Inject } from "../ioc/inject";
import { Injectable } from "../ioc/injectable";
import { IEntity, Storage } from "./types";
import * as uuid from 'uuid';

@Injectable()
export class Repository<TEntity extends IEntity> {
  @Inject('FILE_STORAGE')
  #storage!: Storage<TEntity>;

  async retreiveAll() {
    return this.#storage.getEntities();
  }

  async retreiveById(id: string) {
    const entities = await this.#storage.getEntities();
    
    const entity = entities.find(e => e.id === id);
    if(!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  async retreiveBy(condition: Partial<TEntity>) {
    const entities = await this.#storage.getEntities();
    return entities.filter(entity => {
      for(const conditionProperty in condition) {
        if(condition[conditionProperty] !== entity[conditionProperty]) {
          return false;
        }
      }

      return true;
    })
  }

  async create(entityWithoutId: Omit<TEntity, 'id'>) {
    const entity = {
      ...entityWithoutId,
      id: uuid.v4()
    };
    await this.#storage.save(entity as TEntity);
  }

  async update(entity: TEntity) {
    await this.#storage.save(entity);
  }
} 