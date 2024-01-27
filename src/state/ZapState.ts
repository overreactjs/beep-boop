import { Position } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";

export class ZapState extends PositionedObjectState {
  direction: 1 | -1;

  constructor(pos: Position, direction: 1 | -1) {
    super(pos);
    this.direction = direction;
  }
}
