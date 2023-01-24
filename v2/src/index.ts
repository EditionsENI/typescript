import './controllers/employeeController';
import './controllers/teamController';
import { RouteCollection } from './core/routeCollection';
import { ControllerFactory } from './core/controllerFactory';
import { Server } from './core/server';

const routeCollection = RouteCollection.getInstance();
const factory = ControllerFactory.getInstance();

const server = new Server(routeCollection, factory);
server.initialize();
server.listen();