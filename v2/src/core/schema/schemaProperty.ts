import { SchemaCollection } from "./schemaCollection";
import { SchemaPropertyOptions } from "./types";

export const SchemaProperty = <TClass extends Object, TValue>(options: SchemaPropertyOptions) => {
  return (target: undefined, {name, addInitializer }: ClassFieldDecoratorContext<TClass, TValue>) => {
    addInitializer(function () {
      const schemaName = this.constructor.name
      if(!SchemaCollection.getInstance().has(schemaName)) {
        SchemaCollection.getInstance().add(schemaName, name.toString(), options);
      }
    })
  };
};
