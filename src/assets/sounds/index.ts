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
  Explosion: {
    url: Explosion,
    volume: 0.3,
  },
  Fireball: {
    url: Fireball,
    volume: 0.2,
  },
  MenuNavigate: {
    url: MenuNavigate,
    volume: 0.1,
  },
  MenuSelect: {
    url: MenuSelect,
    volume: 0.1,
  },
  PlayerCollect: {
    url: PlayerCollect,
    volume: 0.2,
  },
  PlayerDeath: {
    url: PlayerDeath,
    volume: 0.2,
  },
  PlayerFire: {
    url: PlayerFire,
    volume: 0.1,
  },
  PlayerJump: {
    url: PlayerJump,
    volume: 0.06,
  },
  PlayerKill: {
    url: PlayerKill,
    volume: 0.2,
  },
  Powerup: {
    url: Powerup,
    volume: 0.2,
  },
  Stars: {
    url: Stars,
    volume: 0.2,
  },
};
