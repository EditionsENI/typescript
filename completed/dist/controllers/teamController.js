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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../decorators/controller");
const inject_1 = require("../decorators/inject");
const keys_1 = require("../keys");
const route_1 = require("../decorators/route");
let TeamController = class TeamController {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async getAll(request, response) {
        const teams = await this.teamRepository.getAll();
        response.json(teams);
    }
};
__decorate([
    route_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getAll", null);
TeamController = __decorate([
    controller_1.Controller(),
    __param(0, inject_1.Inject(keys_1.Keys.teamRepository)),
    __metadata("design:paramtypes", [Object])
], TeamController);
