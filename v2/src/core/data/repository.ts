import { Inject } from "../ioc/inject";
import type { IEntity, IStorage } from "./types";
import { randomUUID } from "crypto";

export class Repository<TEntity extends IEntity> {
  @Inject
  #storage!: IStorage<TEntity>;

  async retreiveAll() {
    return this.#storage.getEntities();
  }

  async create(entityWithoutId: Omit<TEntity, "id">) {
    const entity = {
      ...entityWithoutId,
      id: randomUUID()
    };
    await this.#storage.save(entity as TEntity);
  }
}
