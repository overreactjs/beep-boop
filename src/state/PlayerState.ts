import { Property, Position, VariableProperty } from "@overreact/engine";
import { EntityObjectState } from "./EntityObjectState";
import { PlayerPowerupType, PlayerPowerup, PlayerPowerupEnd, PlayerIndex } from "../types";
import { GameState } from "./GameState";
import { PlayerFireballState, PlayerZapState } from "./ProjectileState";

const INVULNERABILITY_DURATION = 2500;
const DEAD_DURATION = 2000;

export class PlayerState extends EntityObjectState {
  game: GameState;
  player: PlayerIndex;
  lives: Property<number>;
  score: Property<number>;
  flip: Property<boolean>;
  animation: Property<string>;
  combo: Property<number>;
  alive: Property<boolean>;
  invulnerable: Property<number>;
  powerups: PlayerPowerup[] = [];
  deadDuration: number;

  constructor(game: GameState, player: PlayerIndex, pos: Position) {
    super(pos);
    this.game = game;
    this.player = player;
    this.lives = new VariableProperty(3);
    this.score = new VariableProperty(0);
    this.flip = new VariableProperty(false);
    this.animation = new VariableProperty('idle');
    this.combo = new VariableProperty(-1);
    this.alive = new VariableProperty(true);
    this.invulnerable = new VariableProperty(0);
    this.deadDuration = DEAD_DURATION;
  }

  update(delta: number) {
    this.updatePowerups(delta);
    this.updateLives(delta);
  }

  updateLives(delta: number) {
    if (!this.alive.current) {
      if (this.deadDuration > 0) {
        this.deadDuration -= delta;
      } else {
        this.lives.current -= 1;
        this.alive.current = true;
        this.invulnerable.current = INVULNERABILITY_DURATION;
        this.deadDuration = DEAD_DURATION;
        this.respawn();
      }
    }

    if (this.invulnerable.current > 0) {
      this.invulnerable.current -= delta;
    }
  }

  updatePowerups(delta: number) {
    const expired: PlayerPowerup[] = [];

    for (const powerup of this.powerups) {
      if (powerup.end.includes('timer')) {
        powerup.ttl -= delta;

        if (powerup.ttl <= 0) {
          expired.push(powerup);
        }
      }

      if (powerup.end.includes('death')) {
        if (!this.alive.current) {
          expired.push(powerup);
        }
      }
    }

    this.powerups = this.powerups.filter((powerup) => !expired.includes(powerup));
  }

  respawn() {
    const x = this.player === 0 ? 32 : 224;
    this.pos.current = [x, (this.game.level.current - 1) * 200 + 192];
    this.velocity.current = [0, 0];
    this.flip.current = this.player === 1;
  }

  addPoints(points: number) {
    this.score.current += points;
  }

  powerup(type: PlayerPowerupType, end: PlayerPowerupEnd[] = [], ttl: number = 0) {
    const powerup = { type, end, ttl: ttl * 1000 };
    const existing = this.powerups.findIndex((powerup) => powerup.type === type);

    if (existing >= 0) {
      this.powerups[existing] = powerup;
    } else {
      this.powerups.push(powerup);
    }
  }

  hasPowerup(type: PlayerPowerupType) {
    return this.powerups.some((powerup) => powerup.type === type);
  }

  clearPowerups() {
    this.powerups = [];
  }

  clearLevelPowerups() {
    this.powerups = this.powerups.filter((powerup) => !powerup.end.includes('level'));
  }

  createZap(game: GameState): PlayerZapState {
    const [x, y] = this.pos.current;
    const direction = this.flip.current ? -1 : 1;
    const ttl = this.hasPowerup('zapDistance') ? 600 : 500;
    return new PlayerZapState(game, [x + direction * 4, y - 8], direction, this.player, ttl);
  }

  createFireball(game: GameState): PlayerFireballState {
    const [x, y] = this.pos.current;
    const direction = this.flip.current ? -1 : 1;
    return new PlayerFireballState(game, [x + direction * 4, y - 8], direction);
  }
}
