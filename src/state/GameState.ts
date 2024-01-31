import { Position, VariableProperty } from "@overreact/engine";
import { ITEMS, LEVELS } from "../data";
import { ItemType, PointsValue } from "../types";
import { ItemState } from "./ItemState";
import { PlayerState } from "./PlayerState";
import { PointsState } from "./PointsState";
import { ZapState } from "./ZapState";
import { EnemyState } from "./EnemyState";

export class GameState {
  highscore = new VariableProperty(100000);
  
  level = new VariableProperty(1);

  items: ItemState[] = [];

  points: PointsState[] = [];

  zaps: ZapState[] = [];

  players: PlayerState[] = [
    new PlayerState([32, 192]),
    new PlayerState([224, 192]),
  ];

  enemies: EnemyState[] = [
    new EnemyState([112, 32], 'left'),
    new EnemyState([112, 64], 'right'),
    new EnemyState([112, 96], 'left'),
    new EnemyState([112, 128], 'right'),
    new EnemyState([144, 32], 'left'),
    new EnemyState([144, 64], 'right'),
    new EnemyState([144, 96], 'left'),
    new EnemyState([144, 128], 'right'),
  ];

  isSolid(x: number, y: number): boolean {
    return !!LEVELS[this.level.current - 1].collisions[y * 32 + x];
  }

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
    this.showItemPoints(item);
  }

  showItemPoints(item: ItemState) {
    this.showPoints(item.pos.current, ITEMS[item.type].value);
  }

  showPoints(pos: Position, value: PointsValue) {
    this.points = [...this.points, new PointsState(pos, value)];
  }

  hidePoints(id: number) {
    this.points = this.points.filter((entry) => entry.id !== id);
  }

  fireZap(player: PlayerState) {
    const [x, y] = player.pos.current;
    const direction = player.flip.current ? -1 : 1;
    this.zaps = [...this.zaps, new ZapState([x + direction * 4, y - 8], direction)];
  }

  destroyZap(zap: ZapState) {
    this.zaps = this.zaps.filter(({ id }) => id !== zap.id);
  }

  killEnemy(enemy: EnemyState) {
    this.enemies = this.enemies.filter(({ id }) => id !== enemy.id);
  }
}
