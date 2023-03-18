import { IEntity } from "../core/data/types";

export class Employee implements IEntity {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  salary!: number;
}
 