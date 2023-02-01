import { SchemaProperty } from "../core/schemaProperty";

export class SearchEmployeeModel {
  @SchemaProperty({
    description: `Employee's email`,
    type: 'string',
    from: 'querystring',
    pattern: '^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
  })
  email!: string;
}