"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DependencyService {
    constructor() {
        this.dependencies = [];
    }
    add(key, ctor) {
        this.dependencies.push([key, ctor]);
    }
    resolve(key) {
        const dependency = this.dependencies.find(dependency => {
            return dependency[0] === key;
        });
        if (!dependency) {
            throw new Error(`No dependency found for ${key.toString()} key!`);
        }
        else {
            const ctor = dependency[1];
            return new ctor();
        }
    }
}
const dependencyService = new DependencyService();
exports.dependencyService = dependencyService;
