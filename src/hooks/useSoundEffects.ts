import { useCallback, useMemo } from "react";
import { useAudio } from "./useAudio";

import MenuNavigate from "../assets/sounds/MenuNavigate.wav";
import MenuSelect from "../assets/sounds/MenuSelect.wav";
import PlayerCollect from "../assets/sounds/PlayerCollect.wav";
import PlayerDeath from "../assets/sounds/PlayerDeath.wav";
import PlayerFire from "../assets/sounds/PlayerFire.wav";
import PlayerJump from "../assets/sounds/PlayerJump.wav";

const SOUNDS: Record<SoundEffect, string> = {
  MenuNavigate,
  MenuSelect,
  PlayerCollect,
  PlayerDeath,
  PlayerFire,
  PlayerJump,
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
    audio.play(SOUNDS[name], { volume: 0.1 });
  }, [audio]);

  return useMemo(() => ({ play }), [play]);
};
