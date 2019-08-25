"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INJECTIONS_METADATA_KEY = "injections";
exports.INJECTIONS_METADATA_KEY = INJECTIONS_METADATA_KEY;
const Inject = (key) => {
    const decorator = (target, propertyKey, parameterIndex) => {
        const injections = Reflect.getOwnMetadata(INJECTIONS_METADATA_KEY, target) || {};
        injections[parameterIndex] = key;
        Reflect.defineMetadata(INJECTIONS_METADATA_KEY, injections, target);
    };
    return decorator;
};
exports.Inject = Inject;
