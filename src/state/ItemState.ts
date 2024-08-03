import { Property, Position, VariableProperty } from "@overreact/engine";
import { ItemType } from "../types";
import { PositionedObjectState } from "./PositionedObjectState";

type ItemCondition = 'falling' | 'landed';

export class ItemState extends PositionedObjectState {
  type: ItemType;
  target: Property<Position>;
  state: Property<ItemCondition>;

  constructor(pos: Position, target: Position, type: ItemType, state: ItemCondition = 'falling') {
    super(pos);
    this.type = type;
    this.target = new VariableProperty(target);
    this.state = new VariableProperty(state);
  }
}