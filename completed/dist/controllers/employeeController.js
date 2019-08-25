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
const route_1 = require("../decorators/route");
const keys_1 = require("../keys");
const inject_1 = require("../decorators/inject");
let EmployeeController = class EmployeeController {
    constructor(employeeRepository, teamRepository) {
        this.employeeRepository = employeeRepository;
        this.teamRepository = teamRepository;
    }
    async getAll(req, res) {
        const employees = await this.employeeRepository.getAll();
        res.json(employees);
    }
    async post(request, response) {
        if (this.isEmployee(request.body)) {
            if (this.isValid(request.body)) {
                const exists = await this.employeeRepository.exists(request.body.email);
                if (!exists) {
                    await this.employeeRepository.insert(request.body);
                    response.sendStatus(200);
                }
                else {
                    response.status(400).json({
                        message: "Email already exists"
                    });
                }
            }
            else {
                response.status(400).json({
                    message: "Employee data validation failed"
                });
            }
        }
        else {
            response.status(400).json({
                message: "Request body is not an Employee"
            });
        }
    }
    async changeTeam(request, response) {
        const employeeId = request.params.employeeId;
        const teamId = request.params.teamId;
        if (this.isIdentifier(employeeId) && this.isIdentifier(teamId)) {
            const exists = await this.teamRepository.exists(parseInt(teamId));
            if (exists) {
                await this.employeeRepository.changeTeam(parseInt(employeeId), parseInt(teamId));
                response.sendStatus(200);
            }
            else {
                response.status(400).json({
                    message: "Team does not exists"
                });
            }
        }
        else {
            response.status(400).json({
                message: "Invalid identifier"
            });
        }
    }
    isEmployee(value) {
        return (value.firstName &&
            value.lastName &&
            value.email);
    }
    isValid(employee) {
        return (employee.firstName.length &&
            employee.lastName.length &&
            /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/
                .test(employee.email));
    }
    isIdentifier(value) {
        return /^\d+$/.test(value);
    }
};
__decorate([
    route_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getAll", null);
__decorate([
    route_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "post", null);
__decorate([
    route_1.Patch(":employeeId/team/:teamId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "changeTeam", null);
EmployeeController = __decorate([
    controller_1.Controller(),
    __param(0, inject_1.Inject(keys_1.Keys.employeeRepository)),
    __param(1, inject_1.Inject(keys_1.Keys.teamRepository)),
    __metadata("design:paramtypes", [Object, Object])
], EmployeeController);
