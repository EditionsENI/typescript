import { Get, Post, Patch } from "../core/action";
import { Controller } from "../core/controller";
import { IController } from "../core/types";
import { Employee } from "../models/employee";

@Controller()
export class EmployeeController implements IController<Employee> {
    @Get()
    getAll(): Promise<readonly Readonly<Employee>[]> {
        throw new Error("Method not implemented.");
    }

    @Get(':employeeId')
    get(id: string): Promise<Readonly<Employee>> {
        throw new Error("Method not implemented.");
    }

    @Post()
    post(model: Employee): Promise<void> {
        throw new Error("Method not implemented.");
    }

    @Patch(":employeeId/team/:teamId")
    changeTeam(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}