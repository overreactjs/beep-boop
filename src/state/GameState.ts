import { VariableProperty } from "@overreact/engine";
import { ITEMS, LEVELS } from "../data";
import { ItemType } from "../types";
import { ItemState } from "./ItemState";
import { PlayerState } from "./PlayerState";
import { PointsState } from "./PointsState";

export class GameState {
  highscore = new VariableProperty(100000);
  
  level = new VariableProperty(1);

  players: PlayerState[] = [
    new PlayerState([32, 192]),
    new PlayerState([224, 192]),
  ];

  items: ItemState[] = [];

  points: PointsState[] = [];

  createRandomItem() {
    const types = Object.keys(ITEMS) as ItemType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const level = LEVELS[this.level.current - 1];
    const target = level.targets[Math.floor(Math.random() * level.targets.length)];
    this.items = [...this.items, new ItemState(target, type)];
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
}
