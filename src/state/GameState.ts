import { Position, VariableProperty, Velocity, clamp, dist } from "@overreact/engine";
import { ITEMS } from "../data";
import { REGULAR_ITEMS, SPECIAL_ITEMS } from "../data/items";
import { ENEMY_ITEMS, ENEMY_POINTS } from "../data/constants";
import { getHighScore, setHighScore } from "../services/highscores";
import { FlyingStarColor, GamePowerup, GamePowerupEnd, GamePowerupType, ItemHandler, ItemType, LevelData, LevelPortalData, PointsLabel, PointsValue } from "../types";

import { itemHandlers } from "./itemHandlers";

import { BaseEnemyState, EnemyState, GlitchBotState } from "./EnemyState";
import { ItemState } from "./ItemState";
import { ObjectState } from "./ObjectState";
import { PlayerState } from "./PlayerState";
import { PointsState } from "./PointsState";
import { PositionedObjectState } from "./PositionedObjectState";
import { EnemyFireballState, EnemyZapState, FlyingStarState, ProjectileState } from "./ProjectileState";
import { SettingsState } from "./SettingsState";
import { GlitchState } from "./GlitchState";

export class GameState extends ObjectState {

  paused = new VariableProperty(false);

  timescale = new VariableProperty(0);

  started = new VariableProperty(false);

  initialized = new VariableProperty(false);

  highscore = new VariableProperty(getHighScore());

  camera = new VariableProperty<Position>([128, 100]);
  
  level = new VariableProperty(1);

  levelTime = new VariableProperty(0);

  lastEnemyTime = new VariableProperty(0);

  nextLevelTime = new VariableProperty(0);

  nextRandomItemTime = new VariableProperty(5000);

  skipLevelCount = new VariableProperty(0);

  messageTimeout = new VariableProperty(0);

  hurryMode = new VariableProperty(false);

  glitchMode = new VariableProperty(false);

  circuits = new VariableProperty(0);

  itemHandlers: Partial<Record<ItemType, ItemHandler>> = {};

  levels: LevelData[] = [];

  players: PlayerState[] = [];

  enemies: EnemyState[] = [];

  projectiles: ProjectileState[] = [];

  items: ItemState[] = [];

  points: PointsState[] = [];

  powerups: GamePowerup[] = [];

  glitch: GlitchState = new GlitchState();

  settings: SettingsState;

  get levelData() {
    return this.levels[this.level.current - 1];
  }

  get playerCount() {
    return this.players[1].active.current ? 2 : 1;
  }

  get enemyCount() {
    return this.enemies.length - (this.glitchMode.current ? 1 : 0);
  }

  constructor(levels: LevelData[], settings: SettingsState) {
    super();
    this.settings = settings;
    this.itemHandlers = itemHandlers;
    this.levels = levels;
  }

  initPlayers(count: 1 | 2) {
    const p1 = new PlayerState(this, 0, [32, 192], true);
    const p2 = new PlayerState(this, 1, [224, 192], count === 2);
    this.players = [p1, p2];
  }

  start() {
    this.started.current = true;
  }

  pause() {
    this.paused.current = true;
    this.timescale.current = 0;
  }

  unpause() {
    this.paused.current = false;
    this.timescale.current = this.settings.gameSpeed.current;
  }

  /**
   * State update functions
   */

  update(delta: number, onGameOver: () => void) {
    if (!this.paused.current && this.level.current <= this.levels.length) {
      this.updateCircuits();
      this.updateLevelTime(delta);
      this.updatePowerups(delta);
      this.updateGameOver(onGameOver);
      this.updateRandomItems(delta);
      this.updateGlitch(delta);
    }
  }

  updateCircuits() {
    if (this.circuits.current === 31) {
      this.circuits.current = 0;
      this.players.forEach((player) => player.lives.current += 1);
    }
  }

  updateLevelTime(delta: number) {
    this.levelTime.current += delta;
    this.lastEnemyTime.current += delta;

    const isBossLevel = this.level.current % 20 === 0;

    // Unpause the game when the message has been on screen for long enough.
    if (this.messageTimeout.current > 0) {
      this.messageTimeout.current -= delta;

      if (this.messageTimeout.current <= 0) {
        this.messageTimeout.current = 0;
        this.timescale.current = this.settings.gameSpeed.current;
      }
    }

    // Hurry mode isn't applicable to boss fights.
    if (this.enemyCount > 0) {
      if (['normal', 'noGlitch'].includes(this.settings.hurryUpMode.current)) {
        if (!this.hurryMode.current && !isBossLevel) {
          if (this.levelTime.current >= 30000) {
            this.enableHurryMode();
          }
          else if (this.lastEnemyTime.current >= 15000 && this.enemyCount === 1) {
            this.enableHurryMode();
          }
        }
      }

      // Glitch mode after hurry mode has been going for a while.
      if (this.settings.hurryUpMode.current === 'normal') {
        if (!this.glitchMode.current && this.levelTime.current >= 45000 && !isBossLevel) {
          this.enableGlitchMode();
        }
      }
    }

    // Keep track of how long it's been since the last item landed in a level, and when it's been
    // six seconds, move on to the next level.
    if (this.enemyCount === 0 && !this.items.some((item) => item.state.current === 'falling')) {
      this.nextLevelTime.current += delta;

      if (this.nextLevelTime.current >= 6000) {
        this.nextLevelTime.current = 0;
        this.nextLevel();
      }
    } else {
      this.nextLevelTime.current = 0;
    }
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

  updateGameOver(onGameOver: () => void) {
    if (this.players.every((player) => !player.active.current || player.lives.current === 0)) {
      onGameOver();
    }
  }

  updateRandomItems(delta: number) {
    if (this.initialized.current && this.enemyCount > 0) {
      this.nextRandomItemTime.current -= delta;

      if (this.nextRandomItemTime.current <= 0 && this.levelTime.current >= 10000) {
        this.nextRandomItemTime.current = 20000 + Math.round(Math.random() * 20000);
        this.createRandomItem();
      }
    }
  }

  updateGlitch(delta: number) {
    this.glitch.update(delta * (this.enemyCount === 0 ? 3 : 1));
  }

  /*
   * Players
   */

  nearestPlayer(enemy: BaseEnemyState): PlayerState {
    const [p1, p2] = this.players;

    if (!p1.active.current) {
      return p2;
    } else if (!p2.active.current) {
      return p1;
    } else {
      const a = dist(enemy.pos.current, p1.pos.current);
      const b = dist(enemy.pos.current, p2.pos.current);
      return a <= b ? p1 : p2;
    }
  }

  /*
   * Levels
   */

  initLevel() {
    if (this.skipLevelCount.current > 0) {
      this.nextLevel();

    } else if (!this.initialized.current) {
      this.initialized.current = true;
      this.levelTime.current = 0;
      this.lastEnemyTime.current = 5000;
      this.nextLevelTime.current = 0;
      this.hurryMode.current = false;
      this.glitchMode.current = false;
      this.timescale.current = this.settings.gameSpeed.current;
      this.players.forEach((player) => player.respawn());
      this.enemies = [...this.levelData.enemies];
      this.items = [];
      this.glitch.reset();
      this.clearLevelPowerups();
    }
  }

  prevLevel() {
    this.setLevel(this.level.current - 1);
  }

  nextLevel() {
    this.skipLevelCount.current -= 1;
    this.setLevel(this.level.current + 1);
  }

  skipLevels(count: number) {
    this.skipLevelCount.current = count;
    this.nextLevel();
  }

  setLevel(level: number) {
    this.initialized.current = false;
    this.level.current = clamp(level, 1, this.levels.length + 1);
    this.players.forEach((player) => player.respawn());
    this.enemies = [];
  }

  enableHurryMode() {
    this.hurryMode.current = true;
    this.timescale.current = 0;
    this.signalEnemies('anger');
    this.messageTimeout.current = 1000;
  }

  enableGlitchMode() {
    this.glitchMode.current = true;
    this.timescale.current = 0;
    this.enemies.push(new GlitchBotState([32, 24 + (this.level.current - 1) * 200], 0));
    this.messageTimeout.current = 1000;
  }

  isSolid(x: number, y: number): boolean {
    return x >= 0 && x < 32 && y >= 0 && y < 25
      ? !!this.levelData.collisions[(y + 1) * 32 + x]
      : false;
  }

  isPlatformAbove(x: number, y: number): boolean {
    return (this.isSolid(x, y - 4) && !this.isSolid(x, y - 5)) || (this.isSolid(x, y - 3) && !this.isSolid(x, y - 4));
  }

  isPlatformBelow(x: number, y: number): boolean {
    return (this.isSolid(x, y + 1) && !this.isSolid(x, y + 2)) || (this.isSolid(x, y + 2) && !this.isSolid(x, y + 3));
  }

  /*
   * Items
   */

  createRandomItem() {
    const type = SPECIAL_ITEMS[Math.floor(Math.random() * SPECIAL_ITEMS.length)];
    const targets = this.levelData.targets;
    const [tx, ty] = targets[Math.floor(Math.random() * targets.length)];
    const offset = (this.level.current - 1) * 200;
    const item = new ItemState([tx, offset + ty], [tx, offset + ty], type, 'landed');
    this.items = [...this.items, item];
  }

  createFallingItem() {
    let type: ItemType;

    if (this.hasPowerup('goldChest')) {
      type = 'gold_coin';
    } else if (this.hasPowerup('silverChest')) {
      type = 'silver_coin';
    } else if (this.hasPowerup('diamonds')) {
      type = 'diamond';
    } else {
      type = REGULAR_ITEMS[Math.floor(Math.random() * REGULAR_ITEMS.length)];
    }

    const targets = this.levelData.targets;
    const [tx, ty] = targets[Math.floor(Math.random() * targets.length)];
    const offset = (this.level.current - 1) * 200;
    const item = new ItemState([tx, offset], [tx, offset + ty], type);
    this.items = [...this.items, item];
  }

  awardItemPoints(player: PlayerState, item: ItemState) {
    this.awardPoints(player, ITEMS[item.type].value);
    this.showItemPoints(player, item);
  }

  collectItem(player: PlayerState, item: ItemState) {
    this.items = this.items.filter(({ id }) => id !== item.id);

    if (item.type in this.itemHandlers) {
      this.itemHandlers[item.type]?.(this, player, item);
    } else {
      this.awardItemPoints(player, item);
    }
  }

  /*
   * Points
   */

  showItemPoints(player: PlayerState, item: ItemState) {
    const config = ITEMS[item.type];
    this.showPoints(item.pos.current, config.label || config.value, player);
  }

  showPoints(pos: Position, label: PointsLabel, player: PlayerState) {
    this.points = [...this.points, new PointsState(pos, label, player.player)];
  }

  hidePoints(id: number) {
    this.points = this.points.filter((entry) => entry.id !== id);
  }

  awardPoints(player: PlayerState, points: number) {
    player.addPoints(points);
    this.updateHighScore();
  }

  updateHighScore() {
    const max = Math.max(this.players[0].score.current, this.players[1].score.current);

    if (max > this.highscore.current) {
      this.highscore.current = max;
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
    const pos: Position = [x + direction * 12, y - 16];
    const velocity: Velocity = [Math.sin(angle) * 0.75, Math.cos(angle) * 0.75]
    this.fireProjectile(new EnemyFireballState(this, pos, velocity));
  }

  fireEnemyZap(enemy: EnemyState) {
    const [x, y] = enemy.pos.current;
    const direction = enemy.flip.current ? -1 : 1;
    this.fireProjectile(new EnemyZapState(this, [x + direction * 4, y - 8], direction));
  }

  firePlayerFireball(player: PlayerState) {
    this.fireProjectile(player.createFireball(this));
  }

  firePlayerRainbow(player: PlayerState) {
    this.fireProjectile(player.createRainbow(this));
  }

  firePlayerZap(player: PlayerState) {
    this.fireProjectile(player.createZap(this));
  }
  
  fireStars(player: PlayerState, item: ItemState, color: FlyingStarColor) {
    const [x, y] = item.pos.current;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      this.fireProjectile(new FlyingStarState(this, [x, y - 8], [Math.sin(angle) * 3, Math.cos(angle) * 3], player.player, color));
    }
  }

  /*
   * Enemies
   */

  signalEnemies(signal: string) {
    this.enemies.forEach((enemy) => enemy.signal(signal));
  }

  killEnemy(enemy: BaseEnemyState) {
    this.lastEnemyTime.current = 0;

    const player = enemy.killedBy;
    const px = player?.pos.current[0] || Math.random() * 256;

    enemy.velocity.current[0] = px <= enemy.pos.current[0] ? 2 : -2;
    enemy.velocity.current[1] = 0;
    
    if (player) {
      const value = ENEMY_POINTS[(enemy as EnemyState).type];
      const points = (Math.pow(2, clamp(player.combo.current, 0, 3)) * value);
      this.showPoints([...enemy.pos.current], points as PointsValue, player);
      this.awardPoints(player, points);
    }
  }

  destroyEnemy(enemy: BaseEnemyState) {
    this.enemies = this.enemies.filter(({ id }) => id !== enemy.id);

    const count = ENEMY_ITEMS[(enemy as EnemyState).type];

    for (let i = 0; i < count; i++) {
      this.createFallingItem();
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