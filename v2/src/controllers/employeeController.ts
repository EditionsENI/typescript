import { Controller } from "../core/mvc/controller";
import { Get, Post } from "../core/mvc/action";
import { Model } from "../core/mvc/model";
import type { Employee } from "../entities/employee";
import { 
  CreateEmployeeModel 
} from "../models/createEmployeeModel";
import { Repository } from "../core/data/repository";

@Controller
export class EmployeeController {
  readonly #repository: Repository<Employee> = new Repository();

  constructor() {
    this.#repository = new Repository();
  }

  @Get
  async getAll() {
    return this.#repository.retreiveAll();
  }

  @Post
  @Model(CreateEmployeeModel)
  async post(model: CreateEmployeeModel): Promise<void> {
    return this.#repository.create(model);
  }
}
