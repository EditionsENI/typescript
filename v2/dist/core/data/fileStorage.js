"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const memoryStorage_1 = require("./memoryStorage");
class FileStorage extends memoryStorage_1.MemoryStorage {
    #loaded;
    #jsonPath;
    constructor() {
        super();
        this.#jsonPath = (0, path_1.join)(__dirname, 'db.json');
    }
    async #exists() {
        try {
            await (0, promises_1.access)(this.#jsonPath);
            return Promise.resolve(true);
        }
        catch {
            return Promise.resolve(false);
        }
    }
    async #load() {
        if (!this.#loaded) {
            const fileExists = await this.#exists();
            if (!fileExists) {
                await (0, promises_1.writeFile)(this.#jsonPath, JSON.stringify([]), 'utf-8');
            }
            const json = await (0, promises_1.readFile)(this.#jsonPath, 'utf-8');
            this.entities = JSON.parse(json);
            this.#loaded = true;
        }
    }
    async getEntities() {
        await this.#load();
        return super.getEntities();
    }
    async save(entity) {
        await this.#load();
        super.save(entity);
        await (0, promises_1.writeFile)(this.#jsonPath, JSON.stringify(this.entities), 'utf-8');
    }
}
exports.FileStorage = FileStorage;
//# sourceMappingURL=fileStorage.js.map