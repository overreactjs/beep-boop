import { useEffect } from "react";
import { useAudioEngine } from "@overreact/engine";
import { SettingsState } from "../state/SettingsState";

export const useAudioSettingsStartupSync = (settings: SettingsState) => {
  const audio = useAudioEngine();

  useEffect(() => {
    if (settings.muteMusic.current) {
      audio.mute('music');
    }
    if (settings.muteSounds.current) {
      audio.mute('sounds');
    }
    if (settings.volumeMusic.current) {
      audio.setVolume('music', settings.volumeMusic.current);
    }
    if (settings.volumeSounds.current) {
      audio.setVolume('sounds', settings.volumeSounds.current);
    }
  }, [audio, settings]);
};
