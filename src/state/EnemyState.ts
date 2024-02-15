import { DynamicProperty, Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { Direction, EnemyType } from "../types";

/**
 * Basic stuff that all enemies need so that they can be stunned and bounced off the screen.
 */
class BaseEnemyState extends PositionedObjectState {
  velocity: Property<Velocity>;
  angle: Property<number>;
  scale: Property<number>;
  animation: Property<string>;
  direction: Property<Direction>;
  flip: Property<boolean>;

  constructor(pos: Position, direction: Direction) {
    super(pos);
    this.velocity = new VariableProperty([0, 0]);
    this.angle = new VariableProperty(0);
    this.scale = new VariableProperty(1);
    this.animation = new VariableProperty('idle');
    this.direction = new VariableProperty(direction);
    this.flip = new DynamicProperty(this.direction, (direction) => direction === 'left');
  }

  reverse() {
    this.direction.current = this.direction.current === 'left' ? 'right' : 'left';
  }
}

export class BounceBotState extends BaseEnemyState {
  readonly type: EnemyType = 'bounceBot';
}

export class FlyingBotState extends BaseEnemyState {
  readonly type: EnemyType = 'flyingBot';
}

export class GuardBotState extends BaseEnemyState {
  readonly type: EnemyType = 'guardBot';
}

export class RollingBotState extends BaseEnemyState {
  readonly type: EnemyType = 'rollingBot';
}

export class SecurityBotState extends BaseEnemyState {
  readonly type: EnemyType = 'securityBot';
}

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | SecurityBotState;
