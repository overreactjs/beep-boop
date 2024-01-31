import { Property, Position, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";

export class PlayerState extends PositionedObjectState {
  velocity: Property<Velocity>;
  flip: Property<boolean>;
  score: Property<number>;
  animation: Property<string>;
  combo: Property<number>;

  constructor(pos: Position) {
    super(pos);
    this.velocity = new VariableProperty([0, 0]);
    this.flip = new VariableProperty(false);
    this.score = new VariableProperty(0);
    this.animation = new VariableProperty('idle');
    this.combo = new VariableProperty(-1);
  }

  addPoints(points: number) {
    this.score.current += points;
  }
}
