
import './controllers/employeeController';
import { Server } from './core/server';
import { DependencyCollection } from './core/dependencyCollection';
import { DependencyKeys } from './dependencyKeys';
import { Repository } from './data/repository';
import { FileStorage } from './data/fileStorage';

(async () => {
  DependencyCollection.getInstance().register(DependencyKeys.repository, Repository);
  DependencyCollection.getInstance().register(DependencyKeys.storage, FileStorage);

  const server = new Server({
    title: 'Employee directory', 
    description: 'Just a little directory for managing employees', 
    version: '1.0.0'
  });
  await server.initialize();
  server.listen();
}
)()
