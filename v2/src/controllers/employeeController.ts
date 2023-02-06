import { IController } from "../core/mvc/types";
import { Controller } from "../core/mvc/controller";
import { Get, Post, Patch } from "../core/mvc/action";
import { Model } from "../core/mvc/model";
import { Inject } from "../core/ioc/inject";
import { Employee } from "../entities/employee";
import { CreateEmployeeModel } from "../models/createEmployeeModel";
import { ChangeSalaryModel } from "../models/changeSalaryModel";
import { SearchEmployeeModel } from "../models/searchEmployeeModel";
import { GetEmployeeByIdModel } from "../models/getEmployeeByIdModel";
import { Repository } from "../core/data/repository";

@Controller()
export class EmployeeController implements IController<CreateEmployeeModel> {
  @Inject()
  readonly #repository!: Repository<Employee>;

  constructor() {
    this.#repository = new Repository();
  }

  @Get()
  async getAll() {
    return this.#repository.retreiveAll();
  }

  @Get(':id')
  @Model(GetEmployeeByIdModel)
  async get(model: GetEmployeeByIdModel) {
    return this.#repository.retreiveById(model.id);
  }

  @Get('search')
  @Model(SearchEmployeeModel)
  async search(model: SearchEmployeeModel) {
    console.table(model);
    return this.#repository.retreiveBy({
      email: model.email
    })
  }

  @Post()
  @Model(CreateEmployeeModel)
  async post(model: CreateEmployeeModel): Promise<void> {
    return this.#repository.create(model);
  }

  @Model(ChangeSalaryModel)
  @Patch(":employeeId")
  async changeSalary(model: ChangeSalaryModel): Promise<void> {
    const employee = await this.#repository.retreiveById(model.employeeId);
    employee.salary = model.salary;
    return this.#repository.update(employee);
  }
}