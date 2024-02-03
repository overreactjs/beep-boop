import { Position, VariableProperty } from "@overreact/engine";
import { ITEMS, LEVELS } from "../data";
import { ItemType, PointsValue } from "../types";
import { ItemState } from "./ItemState";
import { PlayerState } from "./PlayerState";
import { PointsState } from "./PointsState";
import { ZapState } from "./ZapState";
import { EnemyState } from "./EnemyState";

export class GameState {

  initialized = false;

  highscore = new VariableProperty(100000);
  
  level = new VariableProperty(1);

  items: ItemState[] = [];

  points: PointsState[] = [];

  zaps: ZapState[] = [];

  enemies: EnemyState[] = [];

  players: PlayerState[] = [
    new PlayerState([32, 192]),
    new PlayerState([224, 192]),
  ];

  init() {
    if (!this.initialized) {
      this.initialized = true;
      this.enemies = [...LEVELS[this.level.current - 1].enemies];
      this.players[0].pos.current = [32, (this.level.current - 1) * 200 + 192];
    }
  }

  prevLevel() {
    this.setLevel(this.level.current - 1);
  }

  nextLevel() {
    this.setLevel(this.level.current + 1);
  }

  setLevel(level: number) {
    this.initialized = false;
    this.level.current = level;
    this.enemies = [];
    this.players[0].pos.current = [32, (level - 1) * 200 + 192];
  }

  isSolid(x: number, y: number): boolean {
    return !!LEVELS[this.level.current - 1].collisions[y * 32 + x];
  }

  createRandomItem() {
    const types = Object.keys(ITEMS) as ItemType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const level = LEVELS[this.level.current - 1];
    const offset = (this.level.current - 1) * 200;
    const [tx, ty] = level.targets[Math.floor(Math.random() * level.targets.length)];
    const item = new ItemState([tx, offset], [tx, offset + ty], type);
    this.items = [...this.items, item];
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

  awardPoints(player: PlayerState, points: PointsValue) {
    player.addPoints(points);
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
    const player = this.players[0];
    const points = (Math.pow(2, Math.min(3, player.combo.current)) * 1000) as PointsValue;
    enemy.velocity.current[0] = player.pos.current[0] <= enemy.pos.current[0] ? 1 : -1;
    this.showPoints([...enemy.pos.current], points);
    this.awardPoints(player, points);
  }

  destroyEnemy(enemy: EnemyState) {
    this.enemies = this.enemies.filter(({ id }) => id !== enemy.id);
    this.createRandomItem();
    this.createRandomItem();
  }
}
