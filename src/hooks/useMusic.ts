import { useCallback, useMemo } from "react";
import { useAudio } from "./useAudio";

type UseMusicResult = {
  play: (url: string) => void;
  stop: () => void;
};

export const useMusic = (): UseMusicResult => {
  const audio = useAudio({ key: 'music', channel: 'music' });

  const play = useCallback((url: string) => {
    const track = audio.getAudioTrack();

    if (track?.url !== url) {
      audio.stop();
      audio.play(url, { volume: 0.2, loop: true });
    }
  }, [audio]);

  const stop = useCallback(() => {
    audio.stop();
  }, [audio]);

  return useMemo(() => ({ play, stop }), [play, stop]);
};
