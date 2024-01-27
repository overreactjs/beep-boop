import { Position } from "@overreact/engine";
import { PointsValue } from "../types";
import { PositionedObjectState } from "./PositionedObjectState";

export class PointsState extends PositionedObjectState {
  value: PointsValue;

  constructor(pos: Position, value: PointsValue) {
    super(pos);
    this.value = value;
  }
}