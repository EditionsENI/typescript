import { Controller } from "../decorators/controller";
import { Inject } from "../decorators/inject";
import { Keys } from "../keys";
import { 
  TeamRepository 
} from "../models/repositories/teamRepository";
import { Request, Response } from "express";
import { Get } from "../decorators/route";


@Controller()
class TeamController {
  private readonly teamRepository: TeamRepository;

  constructor(
    @Inject(Keys.teamRepository)
    teamRepository: TeamRepository
  ) {
    this.teamRepository = teamRepository;
  }

  @Get()
  async getAll(request: Request, response: Response) {
    const teams = await this.teamRepository.getAll();
    response.json(teams);    
  }  
}
