import { Entity } from "./entity";
import { readFile, writeFile, access } from "fs/promises";
import { join } from "path";

export interface Storage<TEntity extends Entity> {
  getEntities(): Promise<ReadonlyArray<TEntity>>;
  save(entity: TEntity): Promise<void>;
}

export class FileStorage<TEntity extends Entity> implements Storage<Entity> {
  #entities!: Array<TEntity>;
  #loaded: boolean;
  #jsonPath: string;

  constructor() {
    this.#loaded = false;
    this.#jsonPath = join(__dirname, 'db.json');
  }

  async #exists() {
    try {
      await access(this.#jsonPath);
      return Promise.resolve(true);
    } catch {
      return Promise.resolve(false);
    }
  }
  
  async #load() {
    if(!this.#loaded) {
      const fileExists = await this.#exists();
      if(!fileExists) {
        await writeFile(this.#jsonPath, JSON.stringify([]), 'utf-8');
      }
  
      const json = await readFile(this.#jsonPath, 'utf-8');
      this.#entities = JSON.parse(json) as Array<TEntity>;
    }
  }

  async getEntities() {
    await this.#load();
    return this.#entities;
  }

  async save(entity: TEntity): Promise<void> {
    await this.#load();
    const index = this.#entities.findIndex(e => e.id === entity.id);

    if (index === -1) {
      this.#entities.push(entity);
    } else {
      this.#entities[index] = entity;
    }

    await writeFile(this.#jsonPath, JSON.stringify(this.#entities), 'utf-8');
  }
}