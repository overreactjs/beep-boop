import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";
import { ItemType, PointsValue } from "../types";
import { ITEMS, LEVELS } from "../data";

/**
 * Game
 */
export class GameState {
  highscore = new VariableProperty(100000);
  
  level = new VariableProperty(1);

  players: PlayerState[] = [
    new PlayerState([32, 192]),
    new PlayerState([224, 192]),
  ];

  items: ItemState[] = [];

  points: PointsState[] = [];

  constructor() {
    this.createRandomItem();
  }

  collectItem(item: ItemState) {
    this.items = this.items.filter(({ id }) => id !== item.id);
    this.players[0].addPoints(ITEMS[item.type].value);
    this.showPoints(item);
  }

  showPoints(item: ItemState) {
    this.points = [...this.points, new PointsState(item.pos.current, ITEMS[item.type].value)];
  }

  hidePoints(id: number) {
    this.points = this.points.filter((entry) => entry.id !== id);
  }

  createRandomItem() {
    const types = Object.keys(ITEMS) as ItemType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const level = LEVELS[this.level.current - 1];
    const target = level.targets[Math.floor(Math.random() * level.targets.length)];
    this.items = [...this.items, new ItemState(target, type)];
  }
}

class PositionedObjectState extends ObjectState {
  pos: Property<Position>;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
  }
}

/**
 * Player
 */
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

/**
 * Item
 */
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

/**
 * Points
 */
export class PointsState extends PositionedObjectState {
  value: PointsValue;

  constructor(pos: Position, value: PointsValue) {
    super(pos);
    this.value = value;
  }
}

