export class ControllerFactory {
    static #instance: ControllerFactory;

    readonly #instances: Map<string, unknown> = new Map();

    static getInstance(): ControllerFactory {
        if(!this.#instance) {
            this.#instance = new ControllerFactory();
        }

        return this.#instance;
    }

    register(ctor: new () => unknown) {
        this.#instances.set(ctor.name, new ctor());
    }

    get(controllerName: string) {
        const controller = this.#instances.get(controllerName);
        if(!controller) {
            throw new Error(`Unknown controller: ${controllerName}`);
        }
        return controller;
    }
}