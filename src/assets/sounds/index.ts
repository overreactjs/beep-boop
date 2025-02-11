import EnemyStun from "../../assets/sounds/EnemyStun.wav";
import Explosion from "../../assets/sounds/Explosion.wav";
import Fireball from "../../assets/sounds/Fireball.wav";
import MenuNavigate from "../../assets/sounds/MenuNavigate.wav";
import MenuSelect from "../../assets/sounds/MenuSelect.wav";
import PlayerCollect from "../../assets/sounds/PlayerCollect.wav";
import PlayerDeath from "../../assets/sounds/PlayerDeath.wav";
import PlayerFire from "../../assets/sounds/PlayerFire.wav";
import PlayerJump from "../../assets/sounds/PlayerJump.wav";
import PlayerKill from "../../assets/sounds/PlayerKill.wav";
import Powerup from "../../assets/sounds/Powerup.wav";
import Stars from "../../assets/sounds/Stars.wav";
import { SoundEffect, SoundEffectConfig } from "../../types";

export const SOUNDS: Record<SoundEffect, SoundEffectConfig> = {
  EnemyStun: {
    url: EnemyStun,
    volume: 0.3,
  },
  Explosion: {
    url: Explosion,
    volume: 0.5,
  },
  Fireball: {
    url: Fireball,
    volume: 0.4,
  },
  MenuNavigate: {
    url: MenuNavigate,
    volume: 0.2,
  },
  MenuSelect: {
    url: MenuSelect,
    volume: 0.2,
  },
  PlayerCollect: {
    url: PlayerCollect,
    volume: 0.4,
  },
  PlayerDeath: {
    url: PlayerDeath,
    volume: 0.5,
  },
  PlayerFire: {
    url: PlayerFire,
    volume: 0.2,
  },
  PlayerJump: {
    url: PlayerJump,
    volume: 0.12,
  },
  PlayerKill: {
    url: PlayerKill,
    volume: 0.4,
  },
  Powerup: {
    url: Powerup,
    volume: 0.4,
  },
  Stars: {
    url: Stars,
    volume: 0.4,
  },
};
