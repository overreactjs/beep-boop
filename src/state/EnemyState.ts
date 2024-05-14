import { DynamicProperty, Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { Direction, EnemyType } from "../types";
import { EntityObjectState } from "./EntityObjectState";

/**
 * Basic stuff that all enemies need so that they can be stunned and bounced off the screen.
 */
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

export class BounceBotState extends BaseEnemyState {
  readonly type: EnemyType = 'bounceBot';
}

export class FlyingBotState extends BaseEnemyState {
  readonly type: EnemyType = 'flyingBot';
}

export class GuardBotState extends BaseEnemyState {
  readonly type: EnemyType = 'guardBot';
}

export class PathfinderBotState extends BaseEnemyState {
  readonly type: EnemyType = 'pathfinderBot';

  constructor(pos: Position, direction: Direction) {
    super(pos, direction);
    this.flip = new VariableProperty(direction === 'left');
  }

  turnRandom() {
    if (Math.random() > 0.5) {
      this.turnClockwise();
    } else {
      this.turnAntiClockwise();
    }
  }

  turnClockwise() {
    const dx = -this.velocity.current[1];
    const dy = this.velocity.current[0];
    this.turn([dx, dy]);
  }

  turnAntiClockwise() {
    const dx = this.velocity.current[1];
    const dy = -this.velocity.current[0];
    this.turn([dx, dy]);
  }

  turn180() {
    const dx = -this.velocity.current[0];
    const dy = -this.velocity.current[1];
    this.turn([dx, dy]);
  }

  private turn(velocity: Velocity) {
    this.velocity.current = velocity;
    this.angle.current = Math.atan2(velocity[1], velocity[0]) * 180 / Math.PI;
    this.flip.current = false;

    if (this.angle.current === 180 || this.angle.current === -180) {
      this.angle.current = 0;
      this.flip.current = true;
    }
  }
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
  | PathfinderBotState
  | RollingBotState
  | SecurityBotState
  ;
