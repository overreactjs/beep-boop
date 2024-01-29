import { Position, Property, UsePlatformMovementResult, VariableProperty, Velocity } from "@overreact/engine";
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
  direction: Property<Direction>;
  velocity: Property<Velocity>;
  animation: Property<string>;
  movement?: UsePlatformMovementResult;

  constructor(pos: Position, direction: Direction) {
    super(pos);
    this.direction = new VariableProperty(direction);
    this.velocity = new VariableProperty([0, 0]);
    this.animation = new VariableProperty('idle');
  }

  reverse() {
    this.direction.current = this.direction.current === 'left' ? 'right' : 'left';
  }
}
