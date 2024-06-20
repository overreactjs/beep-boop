import { Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";



export class EntityObjectState extends PositionedObjectState {

  velocity: Property<Velocity>;

  constructor(pos: Position) {
    super(pos);
    this.velocity = new VariableProperty([0, 0]);
  }
}
