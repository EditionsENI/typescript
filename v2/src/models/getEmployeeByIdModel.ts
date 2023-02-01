import { SchemaProperty } from "../core/schemaProperty";

export class GetEmployeeByIdModel {
  @SchemaProperty({
    description: `Employee's identifier`,
    type: 'string',
    from: 'params'
  })
  id!: string;
}