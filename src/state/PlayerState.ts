import { Property, Position, VariableProperty } from "@overreact/engine";
import { EntityObjectState } from "./EntityObjectState";
import { PowerupType, Powerup, PowerupEnd } from "../types";

export class PlayerState extends EntityObjectState {
  flip: Property<boolean>;
  score: Property<number>;
  animation: Property<string>;
  combo: Property<number>;
  alive: Property<boolean>;
  powerups: Powerup[] = [];

  constructor(pos: Position) {
    super(pos);
    this.flip = new VariableProperty(false);
    this.score = new VariableProperty(0);
    this.animation = new VariableProperty('idle');
    this.combo = new VariableProperty(-1);
    this.alive = new VariableProperty(true);
  }

  update(delta: number) {
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
