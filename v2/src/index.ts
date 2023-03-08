
import { Server } from './core/server';
import './controllers/employeeController';

(async () => {
  const server = new Server({
    title: 'Employee directory', 
    description: 'Just a little directory for managing employees', 
    version: '1.0.0'
  });
  await server.initialize();
  server.listen();
}
)()
