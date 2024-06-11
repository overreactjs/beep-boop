import { Position } from "@overreact/engine";
import { PointsLabel } from "../types";
import { PositionedObjectState } from "./PositionedObjectState";

export class PointsState extends PositionedObjectState {
  label: PointsLabel;

  constructor(pos: Position, label: PointsLabel) {
    super(pos);
    this.label = label;
  }
}