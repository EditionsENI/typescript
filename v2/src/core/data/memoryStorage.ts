import { IEntity, Storage } from "./types";

export class MemoryStorage<TEntity extends IEntity> implements Storage<IEntity> {
  protected entities!: Array<TEntity>;

  constructor() {
    this.entities = [];
  }

  async getEntities() {
    return this.entities;
  }

  async save(entity: TEntity): Promise<void> {
    const index = this.entities.findIndex(e => e.id === entity.id);

    if (index === -1) {
      this.entities.push(entity);
    } else {
      this.entities[index] = entity;
    }
  }
}