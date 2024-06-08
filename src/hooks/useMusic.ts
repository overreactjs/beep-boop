import { useCallback, useMemo } from "react";
import { useAudio } from "./useAudio";

type UseMusicResult = {
  play: (url: string) => void;
}

export const useMusic = (): UseMusicResult => {
  const audio = useAudio({ key: 'music' });

  const play = useCallback((url: string) => {
    const track = audio.getAudioTrack();

    if (track?.url !== url) {
      audio.pause();
      audio.play(url, { volume: 0.1, loop: true });
    }
  }, [audio]);

  return useMemo(() => ({ play }), [play]);
};
