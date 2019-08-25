import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import { config } from "dotenv";
import { routeCollection } from "./infrastructure/routeCollection";
import "./controllers/employeeController";
import "./controllers/teamController";
import "./models/repositories/employeeRepository";
import "./models/repositories/teamRepository";

config();

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

const port = process.env.PORT || 3000;

const router = express.Router();
routeCollection.setupRouter(router);
app.use(router);

app.listen(
  port, () => 
  console.log(`Application is listening on port ${port}!`)
);
