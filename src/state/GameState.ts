import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";
import { ItemType } from "../types";
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

  items: ItemState[] = [
  ];

  constructor() {
    this.createRandomItem();
  }

  collectItem(item: ItemState) {
    this.items = this.items.filter(({ id }) => id !== item.id);
    this.players[0].addPoints(1000);
  }

  createRandomItem() {
    const types = Object.keys(ITEMS) as ItemType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const level = LEVELS[this.level.current - 1];
    const target = level.targets[Math.floor(Math.random() * level.targets.length)];
    this.items = [...this.items, new ItemState(target, type)];
  }
}

/**
 * Player
 */
export class PlayerState extends ObjectState {
  pos: Property<Position>;
  flip: Property<boolean>;
  score: Property<number>;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
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
export class ItemState extends ObjectState {
  pos: Property<Position>;
  type: ItemType;

  constructor(pos: Position, type: ItemType) {
    super();
    this.pos = new VariableProperty(pos);
    this.type = type;
  }
}