import { Position, Property, VariableProperty } from "@overreact/engine";
import { Direction } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

const INVULNERABILITY_DURATION = 2500;

export class BaseBossState extends BaseEnemyState {
  health: Property<number>;
  invulnerable: Property<number>;

  constructor(pos: Position, direction: Direction) {
    super(pos, direction);
    this.health = new VariableProperty(15);
    this.invulnerable = new VariableProperty(0);
  }

  update(delta: number) {
    if (this.invulnerable.current > 0) {
      this.invulnerable.current -= delta;
    }
  }

  hit() {
    this.health.current -= 1;

    if (this.health.current > 0) {
      this.invulnerable.current = INVULNERABILITY_DURATION;
    }
  }
}
