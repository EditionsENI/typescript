import { IController } from "./types";

export class ControllerFactory {
    static #instance: ControllerFactory;

    readonly #controllerInstances: Map<string, IController> = new Map();

    static getInstance(): ControllerFactory {
        if(!this.#instance) {
            this.#instance = new ControllerFactory();
        }

        return this.#instance;
    }

    register(ctor: new () => IController) {
        this.#controllerInstances.set(ctor.name, new ctor());
    }

    get(controllerName: string) {
        const controllerInstance = this.#controllerInstances.get(controllerName);
        if(!controllerInstance) {
            throw new Error(`Unknown controller: ${controllerName}`);
        }
        return controllerInstance;
    }
}