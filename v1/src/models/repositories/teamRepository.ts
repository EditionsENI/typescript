import { AbstractRepository } from "./abstractRepository";
import { Repository } from "./repository";
import { Team } from "../types/team";
import { Keys } from "../../keys";
import { Dependency } from "../../decorators/dependency";
import { QueryType } from "./queryType";

interface TeamRepository extends Repository<Team> {
  exists(id: number): Promise<boolean>;
}

@Dependency(Keys.teamRepository)
class TeamRepositoryImpl extends AbstractRepository<
  Team
> implements TeamRepository {

  constructor() {
    super();

    this.addQuery(
      QueryType.GetAll, `
      SELECT 
        t.Id,
        t.Name
      FROM Team as t
    `);
    
 }

  getParams(entity: Team): any[] {
    throw new Error("Method not implemented.");
  }

  async exists(id: number): Promise<boolean> {
    const query = `
      SELECT COUNT(*) as nb
      FROM Team
      WHERE Id = ?
    `;

    await this.open();
    const row = await this.query(query, [id]);
    await this.close();
    return row.nb > 0;    
  }
}

export { TeamRepository };