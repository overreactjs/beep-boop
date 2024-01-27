import { Position, Property, VariableProperty } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";

class StatefulObjectState extends PositionedObjectState {
  state: Property<string>;

  constructor(pos: Position) {
    super(pos);
    this.state = new VariableProperty('idle');
  }
}

export class EnemyState extends StatefulObjectState {
  flip: Property<boolean>;

  constructor(pos: Position) {
    super(pos);
    this.flip = new VariableProperty(false);
  }
}
