import { Get, Post } from "../core/action";
import { Controller } from "../core/controller";
import { IController } from "../core/types";
import { Team } from "../models/team";

@Controller()
export class TeamController implements IController<Team> {
    @Get()
    getAll(): Promise<readonly Readonly<Team>[]> {
        throw new Error("Method not implemented.");
    }
    @Get(':teamId')
    get(id: string): Promise<Readonly<Team>> {
        throw new Error("Method not implemented.");
    }

    @Post()
    post(model: Team): Promise<void> {
        throw new Error("Method not implemented.");
    }
}