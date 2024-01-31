import { DynamicProperty, Position, Property, UsePlatformMovementResult, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { Direction } from "../types";

export class EnemyState extends PositionedObjectState {
  velocity: Property<Velocity>;
  direction: Property<Direction>;
  angle: Property<number>;
  scale: Property<number>;
  animation: Property<string>;
  flip: Property<boolean>;
  movement?: UsePlatformMovementResult;

  constructor(pos: Position, direction: Direction) {
    super(pos);
    this.velocity = new VariableProperty([0, 0]);
    this.direction = new VariableProperty(direction);
    this.angle = new VariableProperty(0);
    this.scale = new VariableProperty(1);
    this.animation = new VariableProperty('idle');
    this.flip = new DynamicProperty(this.direction, (direction) => direction === 'left');
  }

  reverse() {
    this.direction.current = this.direction.current === 'left' ? 'right' : 'left';
  }
}
