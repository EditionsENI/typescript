"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./core/server");
require("./core/data/repository");
require("./core/data/fileStorage");
require("./core/data/memoryStorage");
require("./controllers/employeeController");
(async () => {
    const server = new server_1.Server({
        title: 'Employee directory',
        description: 'Just a little directory for managing employees',
        version: '1.0.0'
    });
    await server.initialize();
    server.listen();
})();
