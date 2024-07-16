import { useCallback, useEffect, useMemo } from "react";
import { useAudio, useAudioEngine } from "@overreact/engine";
import { SOUNDS } from "./constants";
import { SoundEffect } from "./types";

type UseSoundEffectsResult = {
  play: (name: SoundEffect) => void;
};

export const useSoundEffects = (): UseSoundEffectsResult => {
  const audio = useAudio({ channel: 'sounds' });
  
  const play = useCallback((name: SoundEffect) => {
    const { url, volume } = SOUNDS[name];
    audio.play(url, { volume });
  }, [audio]);

  return useMemo(() => ({ play }), [play]);
};

/**
 * Preload all of the sound effects.
 */
export const useSoundEffectsPreload = (): void => {
  const { getBuffer } = useAudioEngine();
  
  useEffect(() => {
    for (const { url } of Object.values(SOUNDS)) {
      getBuffer(url);
    }
  }, [getBuffer]);
};
