import { Position, VariableProperty, Velocity } from "@overreact/engine";
import { EnemyType, Direction } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

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
