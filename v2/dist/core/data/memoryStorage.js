"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStorage = void 0;
class MemoryStorage {
    entities;
    constructor() {
        this.entities = [];
    }
    async getEntities() {
        return this.entities;
    }
    async save(entity) {
        const index = this.entities.findIndex(e => e.id === entity.id);
        if (index === -1) {
            this.entities.push(entity);
        }
        else {
            this.entities[index] = entity;
        }
    }
}
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=memoryStorage.js.map