import { SchemaCollection } from "./schemaCollection";
import { SchemaPropertyOptions } from "./types";

export const SchemaProperty = (options: SchemaPropertyOptions) => {
  return (target: undefined, {name, addInitializer }: ClassFieldDecoratorContext) => {
    addInitializer(function (this) {
      SchemaCollection.getInstance().add((this as any).constructor.name, name.toString(), options);
    })
  };
};
