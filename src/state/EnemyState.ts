import { DynamicProperty, Position, Property, VariableProperty } from "@overreact/engine";
import { Direction, EnemyType } from "../types";
import { EntityObjectState } from "./EntityObjectState";

/**
 * Basic stuff that all enemies need so that they can be stunned and bounced off the screen.
 */
class BaseEnemyState extends EntityObjectState {
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
  speed: Property<number>;

  constructor(pos: Position, direction: Direction) {
    super(pos, direction);
    this.speed = new VariableProperty(0.015);
  }

  charge() {
    this.speed.current = 0.08;
  }

  patrol() { 
    this.speed.current = 0.02;
  }
}

export class SecurityBotState extends BaseEnemyState {
  readonly type: EnemyType = 'securityBot';
}

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | RollingBotState
  | SecurityBotState
  ;
