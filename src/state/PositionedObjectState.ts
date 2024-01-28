import { DynamicProperty, ObjectState, Position, Property, VariableProperty } from "@overreact/engine";

export class PositionedObjectState extends ObjectState {
  pos: Property<Position>;
  block: Property<Position>;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
    this.block = new DynamicProperty(this.pos, ([x, y]): Position => [x >> 3, y >> 3]);
  }
}
