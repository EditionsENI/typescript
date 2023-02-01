import { Get, Post, Patch } from "../core/action";
import { Controller } from "../core/controller";
import { IController } from "../core/types";
import { CreateEmployeeModel } from "../models/createEmployeeModel";
import { Model } from "../core/model";
import { Employee } from "../models/employee";
import { ChangeSalaryModel } from "../models/changeSalaryModel";
import { SearchEmployeeModel } from "../models/searchEmployeeModel";
import { GetEmployeeByIdModel } from "../models/getEmployeeByIdModel";

@Controller()
export class EmployeeController implements IController<CreateEmployeeModel> {
    @Get()
    getAll(): Promise<readonly Readonly<CreateEmployeeModel>[]> {
        throw new Error("Method not implemented.");
    }

    @Get(':id')
    @Model(GetEmployeeByIdModel)
    get(model: GetEmployeeByIdModel): Promise<readonly Readonly<CreateEmployeeModel>[]> {
        console.log(JSON.stringify(model));
        throw new Error("Method not implemented.");
    }

    @Get('search')
    @Model(SearchEmployeeModel)
    search(model: SearchEmployeeModel): Promise<Readonly<Employee>> {
        console.log(JSON.stringify(model));
        throw new Error("Method not implemented.");
    }

    @Post()
    @Model(CreateEmployeeModel)
    post(model: CreateEmployeeModel): Promise<void> {
        console.log(JSON.stringify(model));
        throw new Error("Method not implemented.");
    }

    @Model(ChangeSalaryModel)
    @Patch(":employeeId")
    changeSalary(model: ChangeSalaryModel): Promise<void> {
        console.log(JSON.stringify(model));
        throw new Error("Method not implemented.");
    }
}