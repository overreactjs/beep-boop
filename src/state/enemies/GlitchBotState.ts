import { Position, Property, VariableProperty } from "@overreact/engine";
import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class GlitchBotState extends BaseEnemyState {
  readonly type: EnemyType = 'glitchBot';

  speed: Property<number>;

  constructor(pos: Position, angle: number) {
    super(pos, 'right');
    this.angle.current = angle;
    this.speed = new VariableProperty(0.020);
  }
}
