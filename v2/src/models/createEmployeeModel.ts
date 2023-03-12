import { SchemaProperty } from "../core/schema/schemaProperty";

export class CreateEmployeeModel {
  @SchemaProperty({
    description: `Employee's first name`,
    type: 'string'
  })
  firstName!: string;

  @SchemaProperty({
    description: `Employee's last name`,
    type: 'string'
  })
  lastName!: string;

  @SchemaProperty({
    description: `Employee's email`,
    type: 'string',
    pattern: '^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
  })
  email!: string;

  @SchemaProperty({
    description: `Employee's salary`,
    type: 'integer',
    minimum: 0
  })
  salary!: number;
}