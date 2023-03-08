export class ControllerFactory {
    static #instance: ControllerFactory;

    readonly #controllers: Map<string, new () => unknown> = new Map();
    readonly #instances: Map<string, unknown> = new Map();

    static getInstance(): ControllerFactory {
        if(!this.#instance) {
            this.#instance = new ControllerFactory();
        }

        return this.#instance;
    }

    initialize() {
        for(const [key ,controller] of this.#controllers) {
            this.#instances.set(key, new controller());
        }
    }

    register(ctor: new () => unknown) {
        this.#controllers.set(ctor.name, ctor);
    }

    get(controllerName: string) {
        const instance = this.#instances.get(controllerName);
        if(!instance) {
            throw new Error(`Unknown controller: ${controllerName}`);
        }
        return instance;
    }
}