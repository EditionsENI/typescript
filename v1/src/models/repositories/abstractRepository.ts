import { Repository } from "./repository";
import { Entity } from "../types/entity";
import { Database } from "sqlite3";
import { QueryType } from "./queryType";

abstract class AbstractRepository<
  T extends Entity
> implements Repository<T> {
  private database!: Database;
  private queries: Array<[QueryType, string]>;

  constructor() {
    this.queries = [];
  }

  protected addQuery(type: QueryType, sql: string) {
    const hasQuery = this.queries.some(value => value[0] === type);

    if (hasQuery) {
       throw new Error(`${QueryType[type]} already registered!`);
    }
    
    this.queries.push([type, sql]);    
  }

  protected getQuery(type: QueryType) {
    const query = this.queries.find(value => value[0] === type);

    if (!query) {
      throw new Error(`${
        QueryType[type]
      } is not supported by this repository`);
    }
    
    return query[1];    
  }

  abstract getParams(entity: T): any[];

  protected open(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dbPath = process.env.DB_PATH || "" 
      this.database = new Database(dbPath, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  protected close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.database) {
        reject(new Error("Connection is not opened"));
      } else {
        this.database.close(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }

  protected all(sql: string): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.database.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  protected query(sql: string, params: any[]): Promise<any> {
    return new Promise<T>((resolve, reject) => {
      this.database.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }  

  protected run(sql: string, params: any[]) {
    return new Promise<void>((resolve, reject) => {
      this.database.run(sql, params, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }  

  async getAll(): Promise<T[]> {
    const query = this.getQuery(QueryType.GetAll);
    await this.open();
    const entities = await this.all(query);
    await this.close();
    return entities;
  }

  async insert(entity: T): Promise<void> {
    const query = this.getQuery(QueryType.Insert);
    const parameters = this.getParams(entity);
    await this.open();
    await this.run(query, parameters);
    await this.close();    
  }
}

export { AbstractRepository };