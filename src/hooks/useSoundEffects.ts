import { useCallback, useMemo } from "react";
import { useAudio } from "./useAudio";

import MenuNavigate from "../assets/sounds/MenuNavigate.wav";
import MenuSelect from "../assets/sounds/MenuSelect.wav";
import PlayerCollect from "../assets/sounds/PlayerCollect.wav";
import PlayerDeath from "../assets/sounds/PlayerDeath.wav";
import PlayerFire from "../assets/sounds/PlayerFire.wav";
import PlayerJump from "../assets/sounds/PlayerJump.wav";

type SoundEffectConfig = {
  url: string;
  volume: number;
}

const SOUNDS: Record<SoundEffect, SoundEffectConfig> = {
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
    volume: 0.1,
  },
}

type SoundEffect =
  | 'MenuNavigate'
  | 'MenuSelect'
  | 'PlayerCollect'
  | 'PlayerDeath'
  | 'PlayerFire'
  | 'PlayerJump'
  ;

type UseSoundEffectsResult = {
  play: (name: SoundEffect) => void;
};

export const useSoundEffects = (): UseSoundEffectsResult => {
  const audio = useAudio();
  
  const play = useCallback((name: SoundEffect) => {
    const { url, volume } = SOUNDS[name];
    audio.play(url, { volume });
  }, [audio]);

  return useMemo(() => ({ play }), [play]);
};
