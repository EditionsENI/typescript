import { Entity } from "./entity";

interface Employee extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  teamId: number;
}

export { Employee };