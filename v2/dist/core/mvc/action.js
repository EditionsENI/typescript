"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Post = exports.Get = void 0;
const routeCollection_1 = require("./routeCollection");
const action = (httpVerb, path) => {
    return (target, { name, addInitializer }) => {
        addInitializer(function () {
            routeCollection_1.RouteCollection.getInstance().add({
                controller: this.constructor.name,
                method: name.toString()
            }, httpVerb, path || "");
        });
    };
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
