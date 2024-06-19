import { Position, Property, VariableProperty, clamp, dist } from "@overreact/engine";
import { ALL_ITEM_TYPES, ITEMS } from "../data";
import { FlyingStarColor, GamePowerup, GamePowerupEnd, GamePowerupType, ItemHandler, ItemType, LevelData, LevelPortalData, PointsLabel, PointsValue } from "../types";
import { ItemState } from "./ItemState";
import { PlayerState } from "./PlayerState";
import { PointsState } from "./PointsState";
import { BaseEnemyState, EnemyState } from "./EnemyState";
import { PositionedObjectState } from "./PositionedObjectState";
import { itemHandlers } from "./itemHandlers";
import { EnemyFireballState, EnemyZapState, FlyingStarState, ProjectileState } from "./ProjectileState";
import { ENEMY_ITEMS, ENEMY_POINTS } from "../data/constants";
import { getHighScore, setHighScore } from "../services/highscores";

export class GameState {

  paused = new VariableProperty(false);

  itemHandlers: Partial<Record<ItemType, ItemHandler>> = {};

  initialized = new VariableProperty(false);

  highscore: Property<number>;
  
  level = new VariableProperty(1);

  levelTime = new VariableProperty(0);

  circuits = new VariableProperty(0);

  levels: LevelData[] = [];

  players: PlayerState[] = [];

  enemies: EnemyState[] = [];

  projectiles: ProjectileState[] = [];

  items: ItemState[] = [];

  points: PointsState[] = [];

  powerups: GamePowerup[] = [];

  hurryMode = new VariableProperty(false);

  get levelData() {
    return this.levels[this.level.current - 1];
  }

  constructor(levels: LevelData[]) {
    this.highscore = new VariableProperty(getHighScore());
    this.itemHandlers = itemHandlers;
    this.levels = levels;
    this.players = [
      new PlayerState(this, [32, 192]),
      new PlayerState(this, [224, 192]),
    ];
  }

  update(delta: number) {
    this.updateCircuits();
    this.updateLevelTime(delta);
    this.updatePowerups(delta);

    if (this.levelTime.current >= 30000 && !this.hurryMode.current) {
      this.hurry();
    }
  }

  updateCircuits() {
    if (this.circuits.current === 31) {
      this.circuits.current = 0;
      this.players[0].lives.current += 1;
    }
  }

  updateLevelTime(delta: number) {
    this.levelTime.current += delta;
  }

  updatePowerups(delta: number) {
    const expired: GamePowerup[] = [];

    for (const powerup of this.powerups) {
      if (powerup.end.includes('timer')) {
        powerup.ttl -= delta;

        if (powerup.ttl <= 0) {
          expired.push(powerup);
        }
      }
    }

    this.powerups = this.powerups.filter((powerup) => !expired.includes(powerup));
  }

  /*
   * Levels
   */

  initLevel() {
    if (!this.initialized.current) {
      this.initialized.current = true;
      this.levelTime.current = 0;
      this.players[0].respawn();
      this.enemies = [...this.levelData.enemies];
      this.items = [];
      this.clearLevelPowerups();
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

  hurry() {
    this.hurryMode.current = true;
    this.paused.current = true;
    this.signalEnemies('anger');
    setTimeout(() => this.paused.current = false, 500);
  }

  isSolid(x: number, y: number): boolean {
    return x >= 0 && x < 32 && y >= 0 && y < 25
      ? !!this.levelData.collisions[y * 32 + x]
      : false;
  }

  isPlatformAbove(x: number, y: number) : boolean {
    return (this.isSolid(x, y - 4) && !this.isSolid(x, y - 5)) || (this.isSolid(x, y - 3) && !this.isSolid(x, y - 4));
  }

  /*
   * Items
   */

  createItem() {
    let type: ItemType;

    if (this.hasPowerup('goldChest')) {
      type = 'gold_coin';
    } else if (this.hasPowerup('silverChest')) {
      type = 'silver_coin';
    } else if (this.hasPowerup('diamonds')) {
      type = 'diamond';
    } else {
      type = ALL_ITEM_TYPES[Math.floor(Math.random() * ALL_ITEM_TYPES.length)];
    }

    const targets = this.levelData.targets;
    const [tx, ty] = targets[Math.floor(Math.random() * targets.length)];
    const offset = (this.level.current - 1) * 200;
    const item = new ItemState([tx, offset], [tx, offset + ty], type);
    this.items = [...this.items, item];
  }

  awardItemPoints(item: ItemState) {
    this.awardPoints(this.players[0], ITEMS[item.type].value);
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
    const config = ITEMS[item.type];
    this.showPoints(item.pos.current, config.label || config.value);
  }

  showPoints(pos: Position, label: PointsLabel) {
    this.points = [...this.points, new PointsState(pos, label)];
  }

  hidePoints(id: number) {
    this.points = this.points.filter((entry) => entry.id !== id);
  }

  awardPoints(player: PlayerState, points: number) {
    player.addPoints(points);
    this.updateHighScore();
  }

  updateHighScore() {
    const p1 = this.players[0].score;

    if (p1.current > this.highscore.current) {
      this.highscore.current = p1.current;
      setHighScore(this.highscore.current);
    }
  }

  /*
   * Projectiles
   */

  fireProjectile(projectile: ProjectileState) {
    this.projectiles = [...this.projectiles, projectile];
  }

  fireEnemyFireball(enemy: EnemyState, angle: number) {
    const [x, y] = enemy.pos.current;
    const direction = enemy.flip.current ? -1 : 1;
    this.fireProjectile(new EnemyFireballState(this, [x + direction * 12, y - 16], [Math.sin(angle) * 0.75, Math.cos(angle) * 0.75]));
  }

  fireEnemyZap(enemy: EnemyState) {
    const [x, y] = enemy.pos.current;
    const direction = enemy.flip.current ? -1 : 1;
    this.fireProjectile(new EnemyZapState(this, [x + direction * 4, y - 8], direction));
  }

  firePlayerFireball(player: PlayerState) {
    this.fireProjectile(player.createFireball(this));
  }

  firePlayerZap(player: PlayerState) {
    this.fireProjectile(player.createZap(this));
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

  signalEnemies(signal: string) {
    this.enemies.forEach((enemy) => enemy.signal(signal));
  }

  killEnemy(enemy: BaseEnemyState) {
    const player = this.players[0];
    const value = ENEMY_POINTS[(enemy as EnemyState).type];
    const points = (Math.pow(2, clamp(player.combo.current, 0, 3)) * value);

    enemy.velocity.current[0] = player.pos.current[0] <= enemy.pos.current[0] ? 2 : -2;
    enemy.velocity.current[1] = 0;
    
    this.showPoints([...enemy.pos.current], points as PointsValue);
    this.awardPoints(player, points);
  }

  destroyEnemy(enemy: BaseEnemyState) {
    this.enemies = this.enemies.filter(({ id }) => id !== enemy.id);

    const count = ENEMY_ITEMS[(enemy as EnemyState).type];

    for (let i = 0; i < count; i++) {
      this.createItem();
    }
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

  /**
   * Powerups
   */

  powerup(type: GamePowerupType, end: GamePowerupEnd[] = [], ttl: number = 0) {
    const powerup = { type, end, ttl: ttl * 1000 };
    const existing = this.powerups.findIndex((powerup) => powerup.type === type);

    if (existing >= 0) {
      this.powerups[existing] = powerup;
    } else {
      this.powerups.push(powerup);
    }
  }

  hasPowerup(type: GamePowerupType) {
    return this.powerups.some((powerup) => powerup.type === type);
  }

  clearLevelPowerups() {
    this.powerups = this.powerups.filter((powerup) => !powerup.end.includes('level'));
    this.players.forEach((player) => player.clearLevelPowerups());
  }
}