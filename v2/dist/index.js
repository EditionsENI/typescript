"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileStorage_1 = require("./core/data/fileStorage");
const repository_1 = require("./core/data/repository");
const dependencyContainer_1 = require("./core/ioc/dependencyContainer");
const server_1 = require("./core/server");
(async () => {
    dependencyContainer_1.DependencyContainer.getInstance().register('repository', repository_1.Repository);
    dependencyContainer_1.DependencyContainer.getInstance().register('storage', fileStorage_1.FileStorage);
    const server = new server_1.Server({
        title: 'Employee directory',
        description: 'Just a little directory for managing employees',
        version: '1.0.0'
    });
    await server.initialize();
    server.listen();
})();
//# sourceMappingURL=index.js.map