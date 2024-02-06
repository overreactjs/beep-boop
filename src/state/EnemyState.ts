import { DynamicProperty, Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { UseBubbleBobbleMovementResult } from "../hooks/useBubbleBobbleMovement";
import { Direction, EnemyType } from "../types";

export class EnemyState extends PositionedObjectState {
  type: EnemyType;
  velocity: Property<Velocity>;
  direction: Property<Direction>;
  angle: Property<number>;
  scale: Property<number>;
  animation: Property<string>;
  flip: Property<boolean>;
  movement?: UseBubbleBobbleMovementResult;

  constructor(type: EnemyType, pos: Position, direction: Direction) {
    super(pos);
    this.type = type;
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
