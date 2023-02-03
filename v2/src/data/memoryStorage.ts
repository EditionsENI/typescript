import { Entity } from "./entity";
import { Storage } from "./storage";

export class MemoryStorage<TEntity extends Entity> implements Storage<Entity> {
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