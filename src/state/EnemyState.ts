import { DynamicProperty, Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { Direction, EnemyType } from "../types";

class BaseEnemyState extends PositionedObjectState {
  velocity: Property<Velocity>;
  angle: Property<number>;
  scale: Property<number>;
  animation: Property<string>;

  constructor(pos: Position) {
    super(pos);
    this.velocity = new VariableProperty([0, 0]);
    this.angle = new VariableProperty(0);
    this.scale = new VariableProperty(1);
    this.animation = new VariableProperty('idle');
  }
}

class BasePlatformEnemyState extends BaseEnemyState {
  direction: Property<Direction>;
  flip: Property<boolean>;

  constructor(pos: Position, direction: Direction) {
    super(pos);
    this.direction = new VariableProperty(direction);
    this.flip = new DynamicProperty(this.direction, (direction) => direction === 'left');
  }

  reverse() {
    this.direction.current = this.direction.current === 'left' ? 'right' : 'left';
  }
}

class BaseFlyingEnemyState extends BaseEnemyState {
  direction: Property<Direction>;
  flip: Property<boolean>;

  constructor(pos: Position, direction: Direction) {
    super(pos);
    this.direction = new VariableProperty(direction);
    this.flip = new DynamicProperty(this.direction, (direction) => direction === 'left');
  }

  reverse() {
    this.direction.current = this.direction.current === 'left' ? 'right' : 'left';
  }
}

export class BounceBotState extends BasePlatformEnemyState {
  readonly type: EnemyType = 'bounceBot';
}

export class FlyingBotState extends BaseFlyingEnemyState {
  readonly type: EnemyType = 'flyingBot';
}

export class GuardBotState extends BasePlatformEnemyState {
  readonly type: EnemyType = 'guardBot';
}

export class SecurityBotState extends BasePlatformEnemyState {
  readonly type: EnemyType = 'securityBot';
}

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | SecurityBotState;
