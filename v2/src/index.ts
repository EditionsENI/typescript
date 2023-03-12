
import { FileStorage } from './core/data/fileStorage';
import { Repository } from './core/data/repository';
import { DependencyContainer } from './core/ioc/dependencyContainer';
import { Server } from './core/server';

(async () => {
  DependencyContainer.getInstance().register('repository', Repository);
  DependencyContainer.getInstance().register('storage', FileStorage);
  const server = new Server({
    title: 'Employee directory', 
    description: 'Just a little directory for managing employees', 
    version: '1.0.0'
  });

  await server.start();
}
)()
