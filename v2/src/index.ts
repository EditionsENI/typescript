import './controllers/employeeController';
import { RouteCollection } from './core/routeCollection';
import { ControllerFactory } from './core/controllerFactory';
import { Server } from './core/server';
import { SchemaCollection } from './core/schemaCollection';

const routeCollection = RouteCollection.getInstance();
const schemaCollection = SchemaCollection.getInstance();
const factory = ControllerFactory.getInstance();

(async () => {
  const server = new Server(routeCollection, schemaCollection, factory);
  server.setInfo('Employee directory', 'Just a little directory for managing employees', '1.0.0');
  await server.initialize();
  server.listen();
}
)()
