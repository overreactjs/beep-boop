import { DynamicProperty, Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { UseBubbleBobbleMovementResult } from "../hooks/useBubbleBobbleMovement";
import { Direction, EnemyType } from "../types";

class BaseEnemyState extends PositionedObjectState {
  velocity: Property<Velocity>;
  direction: Property<Direction>;
  angle: Property<number>;
  scale: Property<number>;
  animation: Property<string>;
  flip: Property<boolean>;

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

export class BounceBotState extends BaseEnemyState {
  readonly type: EnemyType = 'bounceBot';
  movement?: UseBubbleBobbleMovementResult;
}

export class FlyingBotState extends BaseEnemyState {
  readonly type: EnemyType = 'flyingBot';
}

export class GuardBotState extends BaseEnemyState {
  readonly type: EnemyType = 'guardBot';
  movement?: UseBubbleBobbleMovementResult;
}

export class SecurityBotState extends BaseEnemyState {
  readonly type: EnemyType = 'securityBot';
  movement?: UseBubbleBobbleMovementResult;
}

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | SecurityBotState;
