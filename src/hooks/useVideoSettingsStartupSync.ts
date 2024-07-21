import { useEffect } from "react";
import { SettingsState } from "../state/SettingsState";

export const useVideoSettingsStartupSync = (settings: SettingsState) => {
  useEffect(() => {
    window.engine?.setWindowMode(settings.windowMode.current);
  }, [settings.windowMode]);
};
