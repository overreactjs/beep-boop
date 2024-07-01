import { useCallback, useMemo } from "react";
import { useAudio } from "./useAudio";

const AUDIO_OPTIONS = { key: 'music' };

type UseMusicResult = {
  play: (url: string) => void;
  stop: () => void;
};

export const useMusic = (): UseMusicResult => {
  const audio = useAudio(AUDIO_OPTIONS);

  const play = useCallback((url: string) => {
    const track = audio.getAudioTrack();

    if (track?.url !== url) {
      audio.stop();
      audio.play(url, { volume: 0.1, loop: true });
    }
  }, [audio]);

  const stop = useCallback(() => {
    audio.stop();
  }, [audio]);

  return useMemo(() => ({ play, stop }), [play, stop]);
};
