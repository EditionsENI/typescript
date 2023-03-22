"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeCollection_1 = require("../infrastructure/routeCollection");
const action = (httpVerb, path) => {
    const decorator = (target, key, descriptor) => {
        routeCollection_1.routeCollection.registerAction(target.constructor.name, key.toString(), httpVerb, path);
    };
    return decorator;
};
const Get = (path) => {
    return action("get", path);
};
exports.Get = Get;
const Post = (path) => {
    return action("post", path);
};
exports.Post = Post;
const Patch = (path) => {
    return action("patch", path);
};
exports.Patch = Patch;
