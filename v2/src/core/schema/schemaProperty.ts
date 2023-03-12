import { SchemaCollection } from "./schemaCollection";
import { SchemaPropertyOptions } from "./types";

export const SchemaProperty = <TModel extends Object>(options: SchemaPropertyOptions) => {
  return (target: undefined, context: ClassFieldDecoratorContext<TModel>) => {
    context.addInitializer(function () {
        SchemaCollection.getInstance().add(this.constructor.name, context.name.toString(), options);
    });
  }
};
