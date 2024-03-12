import { Property, Position, VariableProperty } from "@overreact/engine";
import { EntityObjectState } from "./EntityObjectState";
import { PowerupType, Powerup, PowerupEnd } from "../types";
import { GameState } from "./GameState";

export class PlayerState extends EntityObjectState {
  game: GameState;
  lives: Property<number>;
  score: Property<number>;
  flip: Property<boolean>;
  animation: Property<string>;
  combo: Property<number>;
  alive: Property<boolean>;
  powerups: Powerup[] = [];
  deadDuration: number;

  constructor(game: GameState, pos: Position) {
    super(pos);
    this.game = game;
    this.lives = new VariableProperty(3);
    this.score = new VariableProperty(0);
    this.flip = new VariableProperty(false);
    this.animation = new VariableProperty('idle');
    this.combo = new VariableProperty(-1);
    this.alive = new VariableProperty(true);
    this.deadDuration = 2000;
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
        this.deadDuration = 2000;
        this.lives.current -= 1;
        this.alive.current = true;
        this.respawn();
      }
    }
  }

  updatePowerups(delta: number) {
    const expired: Powerup[] = [];

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
    this.pos.current = [32, (this.game.level.current - 1) * 200 + 192];
    this.velocity.current = [0, 0];
  }

  addPoints(points: number) {
    this.score.current += points;
  }

  powerup(type: PowerupType, end: PowerupEnd[] = [], ttl: number = 0) {
    const powerup = { type, end, ttl: ttl * 1000 };
    const existing = this.powerups.findIndex((powerup) => powerup.type === type);

    if (existing >= 0) {
      this.powerups[existing] = powerup;
    } else {
      this.powerups.push(powerup);
    }
  }

  hasPowerup(type: PowerupType) {
    return this.powerups.some((powerup) => powerup.type === type);
  }

  clearPowerups() {
    this.powerups = [];
  }
}
