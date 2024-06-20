import { DynamicProperty, Position, Property, VariableProperty } from "@overreact/engine";
import { ObjectState } from "./ObjectState";

export class PositionedObjectState extends ObjectState {

  pos: Property<Position>;
  
  block: Property<Position>;

  offset: number;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
    this.offset = Math.floor(pos[1] / 200) * 200;
    this.block = new DynamicProperty(this.pos, ([x, y]): Position => {
      return [
        x >> 3,
        (y - (Math.floor(y / 200) * 200)) >> 3
      ];
    });
  }
}
