import { Position, Property, VariableProperty } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { Direction } from "../types";

class StatefulObjectState extends PositionedObjectState {
  state: Property<string[]>;

  constructor(pos: Position) {
    super(pos);
    this.state = new VariableProperty(['idle']);
  }

  push(state: string) {
    this.state.current.push(state);
  }
}

export class EnemyState extends StatefulObjectState {
  flip: Property<boolean>;
  direction: Property<Direction>;

  constructor(pos: Position) {
    super(pos);
    this.flip = new VariableProperty(false);
    this.direction = new VariableProperty('right');
  }
}
