import { Position, Property, VariableProperty } from "@overreact/engine";
import { Direction, EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

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
