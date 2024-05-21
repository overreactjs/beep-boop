import { Property, Position, VariableProperty, DynamicProperty } from "@overreact/engine";
import { Direction } from "../../types";
import { EntityObjectState } from "../EntityObjectState";

export class BaseEnemyState extends EntityObjectState {
  angle: Property<number>;
  scale: Property<number>;
  animation: Property<string>;
  direction: Property<Direction>;
  flip: Property<boolean>;

  constructor(pos: Position, direction: Direction) {
    super(pos);
    this.angle = new VariableProperty(0);
    this.scale = new VariableProperty(1);
    this.animation = new VariableProperty('idle');
    this.direction = new VariableProperty(direction);
    this.flip = new DynamicProperty(this.direction, (direction) => direction === 'left');
  }

  reverse() {
    this.direction.current = this.direction.current === 'left' ? 'right' : 'left';
    this.velocity.current[0] = -this.velocity.current[0];
  }
}
