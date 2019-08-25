"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractRepository_1 = require("./abstractRepository");
const keys_1 = require("../../keys");
const dependency_1 = require("../../decorators/dependency");
const queryType_1 = require("./queryType");
let TeamRepositoryImpl = class TeamRepositoryImpl extends abstractRepository_1.AbstractRepository {
    constructor() {
        super();
        this.addQuery(queryType_1.QueryType.GetAll, `
      SELECT 
        t.Id,
        t.Name
      FROM Team as t
    `);
    }
    getParams(entity) {
        throw new Error("Method not implemented.");
    }
    async exists(id) {
        const query = `
      SELECT COUNT(*) as nb
      FROM Team
      WHERE Id = ?
    `;
        await this.open();
        const row = await this.query(query, [id]);
        await this.close();
        return row.nb > 0;
    }
};
TeamRepositoryImpl = __decorate([
    dependency_1.Dependency(keys_1.Keys.teamRepository),
    __metadata("design:paramtypes", [])
], TeamRepositoryImpl);
