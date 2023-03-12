import { SchemaCollection } from "./schemaCollection";
import { SchemaPropertyOptions } from "./types";

export const SchemaProperty = <TClass extends Object, TValue>(options: SchemaPropertyOptions) => {
  return (target: undefined, {name, addInitializer }: ClassFieldDecoratorContext<TClass, TValue>) => {
    addInitializer(function () {
        SchemaCollection.getInstance().add(this.constructor.name, name.toString(), options);
    });
  };
};
