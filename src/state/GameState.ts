import { Position, VariableProperty, clamp, dist } from "@overreact/engine";
import { ITEMS } from "../data";
import { FlyingStarColor, ItemHandler, ItemType, LevelData, LevelPortalData, PointsValue } from "../types";
import { ItemState } from "./ItemState";
import { PlayerState } from "./PlayerState";
import { PointsState } from "./PointsState";
import { EnemyState } from "./EnemyState";
import { PositionedObjectState } from "./PositionedObjectState";
import { itemHandlers } from "./itemHandlers";
import { EnemyZapState, FlyingStarState, PlayerFireballState, PlayerZapState, ProjectileState } from "./ProjectileState";


export class GameState {

  itemHandlers: Partial<Record<ItemType, ItemHandler>> = {};

  initialized = new VariableProperty(false);

  highscore = new VariableProperty(100000);
  
  level = new VariableProperty(1);

  circuits = new VariableProperty(0);

  levels: LevelData[] = [];

  players: PlayerState[] = [];

  enemies: EnemyState[] = [];

  projectiles: ProjectileState[] = [];

  items: ItemState[] = [];

  points: PointsState[] = [];

  get levelData() {
    return this.levels[this.level.current - 1];
  }

  constructor(levels: LevelData[]) {
    this.itemHandlers = itemHandlers;
    this.levels = levels;
    this.players = [
      new PlayerState(this, [32, 192]),
      new PlayerState(this, [224, 192]),
    ];
  }

  update() {
    this.updateCircuits();
  }

  updateCircuits() {
    if (this.circuits.current === 31) {
      this.circuits.current = 0;
      this.players[0].lives.current += 1;
    }
  }

  /*
   * Levels
   */

  initLevel() {
    if (!this.initialized.current) {
      this.initialized.current = true;
      this.players[0].respawn();
      this.enemies = [...this.levelData.enemies];
      this.items = [];
    }
  }

  prevLevel() {
    this.setLevel(this.level.current - 1);
  }

  nextLevel() {
    this.setLevel(this.level.current + 1);
  }

  setLevel(level: number) {
    this.initialized.current = false;
    this.level.current = level;
    this.players[0].respawn();
    this.enemies = [];
  }

  isSolid(x: number, y: number): boolean {
    return !!this.levelData.collisions[y * 32 + x];
  }

  isPlatformAbove(x: number, y: number) : boolean {
    return (this.isSolid(x, y - 4) && !this.isSolid(x, y - 5)) || (this.isSolid(x, y - 3) && !this.isSolid(x, y - 4));
  }

  /*
   * Items
   */

  createRandomItem() {
    const types = Object.keys(ITEMS) as ItemType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const targets = this.levelData.targets;
    const [tx, ty] = targets[Math.floor(Math.random() * targets.length)];
    const offset = (this.level.current - 1) * 200;
    const item = new ItemState([tx, offset], [tx, offset + ty], type);
    this.items = [...this.items, item];
  }

  awardItemPoints(item: ItemState) {
    this.players[0].addPoints(ITEMS[item.type].value);
    this.showItemPoints(item);
  }

  collectItem(item: ItemState) {
    this.items = this.items.filter(({ id }) => id !== item.id);

    if (item.type in this.itemHandlers) {
      this.itemHandlers[item.type]?.(this, item);
    } else {
      this.awardItemPoints(item);
    }
  }

  /*
   * Points
   */

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

  /*
   * Projectiles
   */

  fireProjectile(projectile: ProjectileState) {
    this.projectiles = [...this.projectiles, projectile];
  }

  fireEnemyZap(enemy: EnemyState) {
    const [x, y] = enemy.pos.current;
    const direction = enemy.flip.current ? -1 : 1;
    this.fireProjectile(new EnemyZapState(this, [x + direction * 4, y - 8], direction));
  }

  firePlayerFireball(player: PlayerState) {
    const [x, y] = player.pos.current;
    const direction = player.flip.current ? -1 : 1;
    this.fireProjectile(new PlayerFireballState(this, [x + direction * 4, y - 8], direction));
  }

  firePlayerZap(player: PlayerState) {
    const [x, y] = player.pos.current;
    const direction = player.flip.current ? -1 : 1;
    this.fireProjectile(new PlayerZapState(this, [x + direction * 4, y - 8], direction));
  }
  
  fireStars(item: ItemState, color: FlyingStarColor) {
    const [x, y] = item.pos.current;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      this.fireProjectile(new FlyingStarState(this, [x, y - 8], [Math.sin(angle) * 3, Math.cos(angle) * 3], color));
    }
  }

  /*
   * Enemies
   */

  killEnemy(enemy: EnemyState) {
    const player = this.players[0];
    const points = (Math.pow(2, clamp(player.combo.current, 0, 3)) * 1000) as PointsValue;
    enemy.velocity.current[0] = player.pos.current[0] <= enemy.pos.current[0] ? 1 : -1;
    this.showPoints([...enemy.pos.current], points);
    this.awardPoints(player, points);
  }

  destroyEnemy(enemy: EnemyState) {
    this.enemies = this.enemies.filter(({ id }) => id !== enemy.id);
    this.createRandomItem();
    this.createRandomItem();
  }

  /*
   * Teleport
   */

  teleport(entity: PositionedObjectState) {
    const pos: Position = [entity.pos.current[0], entity.pos.current[1] % 200];

    let source: LevelPortalData | null = null;
    let best = Number.MAX_VALUE;

    for (const portal of this.levelData.portals) {
      const distance = dist(pos, portal.pos);
      if (distance < best) {
        best = distance;
        source = portal;
      }
    }

    if (source) {
      const target = this.levelData.portals[source?.target - 1];
      const dx = target.pos[0] - source.pos[0];
      const dy = target.pos[1] - source.pos[1];

      entity.pos.current[0] += dx + (28 * -Math.sign(dx)); // 28 = width of teleporter + width of player
      entity.pos.current[1] += dy;
    }
  }
}