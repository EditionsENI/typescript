import { IEntity, IStorage } from "./types";

export class MemoryStorage<
  TEntity extends IEntity
> implements IStorage<IEntity> {
  protected entities: Array<TEntity>;

  constructor() {
    this.entities = [];
  }
  
  async getEntities() {
    return Promise.resolve(this.entities);
  }
  
  save(entity: TEntity) {
    const index = this.entities.findIndex(e => e.id === entity.id);

    if (index === -1) {
      this.entities.push(entity);
    } else {
      this.entities[index] = entity;
    }
    return Promise.resolve();
  }  
}
