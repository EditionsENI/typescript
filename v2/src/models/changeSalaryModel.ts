import { SchemaProperty } from "../core/schemaProperty";

export class ChangeSalaryModel {
  @SchemaProperty({
    description: `Employee's identifier`,
    type: 'string',
    from: 'params'
  })
  employeeId!: string;
  
  @SchemaProperty({
    description: `Employee's salary`,
    type: 'integer',
    from: 'body',
    minimum: 0
  })
  salary!: number;
}