"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const queryType_1 = require("./queryType");
class AbstractRepository {
    constructor() {
        this.queries = [];
    }
    addQuery(type, sql) {
        const hasQuery = this.queries.some(value => value[0] === type);
        if (hasQuery) {
            throw new Error(`${queryType_1.QueryType[type]} already registered!`);
        }
        this.queries.push([type, sql]);
    }
    getQuery(type) {
        const query = this.queries.find(value => value[0] === type);
        if (!query) {
            throw new Error(`${queryType_1.QueryType[type]} is not supported by this repository`);
        }
        return query[1];
    }
    open() {
        return new Promise((resolve, reject) => {
            const dbPath = process.env.DB_PATH || "";
            this.database = new sqlite3_1.Database(dbPath, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            if (!this.database) {
                reject(new Error("Connection is not opened"));
            }
            else {
                this.database.close(err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    }
    all(sql) {
        return new Promise((resolve, reject) => {
            this.database.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.database.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    run(sql, params) {
        return new Promise((resolve, reject) => {
            this.database.run(sql, params, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async getAll() {
        const query = this.getQuery(queryType_1.QueryType.GetAll);
        await this.open();
        const entities = await this.all(query);
        await this.close();
        return entities;
    }
    async insert(entity) {
        const query = this.getQuery(queryType_1.QueryType.Insert);
        const parameters = this.getParams(entity);
        await this.open();
        await this.run(query, parameters);
        await this.close();
    }
}
exports.AbstractRepository = AbstractRepository;
