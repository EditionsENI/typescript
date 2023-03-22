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
const queryType_1 = require("./queryType");
const keys_1 = require("../../keys");
const dependency_1 = require("../../decorators/dependency");
let EmployeeRepositoryImpl = class EmployeeRepositoryImpl extends abstractRepository_1.AbstractRepository {
    constructor() {
        super();
        this.addQuery(queryType_1.QueryType.GetAll, `
      SELECT
        e.Id as id,
        e.FirstName as firstName,
        e.LastName as lastName,
        e.Email as email,
        t.Id as teamId
      FROM Employee as e
      LEFT OUTER JOIN Team as t on e.TeamId = t.Id
    `);
        this.addQuery(queryType_1.QueryType.Insert, `
        INSERT INTO 
        Employee
        (
          FirstName, 
          LastName, 
          Email, 
          TeamId
        )
        VALUES(?, ?, ?, ?)
    `);
    }
    getParams(entity) {
        return [
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.teamId || undefined
        ];
    }
    async exists(email) {
        const query = `
      SELECT COUNT(*) as nb
      FROM Employee
      WHERE Email = ?
    `;
        await this.open();
        const row = await this.query(query, [email]);
        await this.close();
        return row.nb > 0;
    }
    async changeTeam(employeeId, teamId) {
        const query = `
      UPDATE Employee
      SET TeamId = ?
      WHERE Id = ?
    `;
        await this.open();
        await this.run(query, [teamId, employeeId]);
        await this.close();
    }
};
EmployeeRepositoryImpl = __decorate([
    dependency_1.Dependency(keys_1.Keys.employeeRepository),
    __metadata("design:paramtypes", [])
], EmployeeRepositoryImpl);
