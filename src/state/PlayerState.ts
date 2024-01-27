import { Property, Position, VariableProperty } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";

export class PlayerState extends PositionedObjectState {
  flip: Property<boolean>;
  score: Property<number>;

  constructor(pos: Position) {
    super(pos);
    this.flip = new VariableProperty(false);
    this.score = new VariableProperty(0);
  }

  addPoints(points: number) {
    this.score.current += points;
  }
}
