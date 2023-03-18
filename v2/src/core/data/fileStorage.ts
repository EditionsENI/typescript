import { readFile, writeFile, access } from "fs/promises";
import { join } from "path";
import { MemoryStorage } from "./memoryStorage";
import { IEntity } from "./types";

export class FileStorage<
  TEntity extends IEntity
> extends MemoryStorage<TEntity> {
  #loaded?: true;
  #jsonPath: string;

  constructor() {
    super();
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
        await writeFile(
          this.#jsonPath, 
          JSON.stringify([]), 
          'utf-8'
        );
      }
  
      const json = await readFile(this.#jsonPath, 'utf-8');
      this.entities = JSON.parse(json) as Array<TEntity>;
      this.#loaded = true;
    }
  }

  async getEntities() {
    await this.#load();
    return super.getEntities();
  }

  async save(entity: TEntity): Promise<void> {
    await this.#load();
    super.save(entity);
    await writeFile(
      this.#jsonPath, 
      JSON.stringify(this.entities), 'utf-8'
    );
  }
}
