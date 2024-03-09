import { Property, Position, VariableProperty } from "@overreact/engine";
import { EntityObjectState } from "./EntityObjectState";

export class PlayerState extends EntityObjectState {
  flip: Property<boolean>;
  score: Property<number>;
  animation: Property<string>;
  combo: Property<number>;
  alive: Property<boolean>;

  constructor(pos: Position) {
    super(pos);
    this.flip = new VariableProperty(false);
    this.score = new VariableProperty(0);
    this.animation = new VariableProperty('idle');
    this.combo = new VariableProperty(-1);
    this.alive = new VariableProperty(true);
  }

  addPoints(points: number) {
    this.score.current += points;
  }
}
