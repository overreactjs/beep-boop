import { Property, Position, VariableProperty } from "@overreact/engine";
import { ItemType } from "../types";
import { PositionedObjectState } from "./PositionedObjectState";

export class ItemState extends PositionedObjectState {
  type: ItemType;
  target: Property<Position>;
  state: Property<'falling' | 'landed'>;

  constructor(target: Position, type: ItemType) {
    super([target[0], 0]);
    this.type = type;
    this.target = new VariableProperty(target);
    this.state = new VariableProperty('falling');
  }
}