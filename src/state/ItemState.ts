import { Property, Position, VariableProperty } from "@overreact/engine";
import { ItemType } from "../types";
import { PositionedObjectState } from "./PositionedObjectState";

export class ItemState extends PositionedObjectState {
  type: ItemType;
  target: Property<Position>;
  state: Property<'falling' | 'landed'>;

  constructor(pos: Position, target: Position, type: ItemType) {
    super(pos);
    this.type = type;
    this.target = new VariableProperty(target);
    this.state = new VariableProperty('falling');
  }
}