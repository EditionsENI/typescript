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
import { DependencyKeys } from "../dependencyKeys";

@Controller()
export class EmployeeController implements IController<CreateEmployeeModel> {
  @Inject(DependencyKeys.repository)
  readonly #employeeRepository!: Repository<Employee>;

  constructor() {
    this.#employeeRepository = new Repository();
  }

  @Get()
  async getAll() {
    return this.#employeeRepository.retreiveAll();
  }

  @Get(':id')
  @Model(GetEmployeeByIdModel)
  async get(model: GetEmployeeByIdModel) {
    return this.#employeeRepository.retreiveById(model.id);
  }

  @Get('search')
  @Model(SearchEmployeeModel)
  async search(model: SearchEmployeeModel) {
    console.table(model);
    return this.#employeeRepository.retreiveBy({
      email: model.email
    })
  }

  @Post()
  @Model(CreateEmployeeModel)
  async post(model: CreateEmployeeModel): Promise<void> {
    return this.#employeeRepository.create(model);
  }

  @Model(ChangeSalaryModel)
  @Patch(":employeeId")
  async changeSalary(model: ChangeSalaryModel): Promise<void> {
    const employee = await this.#employeeRepository.retreiveById(model.employeeId);
    employee.salary = model.salary;
    return this.#employeeRepository.update(employee);
  }
}