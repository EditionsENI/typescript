
import { Server } from './core/server';
import './core/data/repository';
import './core/data/fileStorage';
import './core/data/memoryStorage';
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
