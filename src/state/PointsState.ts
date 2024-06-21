import { Position } from "@overreact/engine";
import { PlayerIndex, PointsLabel } from "../types";
import { PositionedObjectState } from "./PositionedObjectState";

export class PointsState extends PositionedObjectState {
  label: PointsLabel;
  player: PlayerIndex;

  constructor(pos: Position, label: PointsLabel, player: PlayerIndex) {
    super(pos);
    this.label = label;
    this.player = player;
  }
}