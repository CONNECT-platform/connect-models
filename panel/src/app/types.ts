export interface FieldSchema {
  name: string;
  type: string;
  reference?: ModelSchema;
}

export interface ModelSchema {
  name: string;
  fields: FieldSchema[];
}

export class Field {
  public component?: any;
  public filter?: any;
  public order?: any;

  constructor(public schema: FieldSchema, public model: Model) {}

  public get name(): string { return this.schema.name; }
  public get type(): string {
    if (this.schema.type) {
      if (this.schema.type == 'ref')
        return 'reference ' + this.schema.reference.name;

      return this.schema.type;
    }

    return undefined;
  }
}

export class Model {
  public component?: any;

  fields: {[name: string]: Field} = {};
  constructor(public schema: ModelSchema, public alias?: string) {
    schema.fields.map(schema => this.fields[schema.name] = new Field(schema, this));
  }

  public get name(): string {
    return this.schema.name;
  }
}

export interface Join {
  from: Field;
  to: Model;
  component?: any;
}

export type FilterType = 'equals'|'before'|'after'|'beforeeq'|'aftereq'|'neq';

export interface Filter {
  field: Field;
  type: FilterType;
  ref: string;
}

export type OrderType = 'ascending' | 'descending';

export interface Order {
  field: Field;
  direction: OrderType;
}
