import { Entity } from "./entity";

interface Team extends Entity {
  id: number;
  name: string;
}

export { Team };