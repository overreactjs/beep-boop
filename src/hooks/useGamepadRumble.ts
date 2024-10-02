import { useCallback } from "react";
import { useGamepad } from "@overreact/engine";
import { PlayerIndex } from "../types";
import { useGamepadIndex } from "./useGamepadIndex";
import { useSettings } from "./useSettings";

export const useGamepadRumble = (player: PlayerIndex) => {
  const settings = useSettings();
  const gamepad = useGamepad();
  const gamepadIndex = useGamepadIndex(player);

  return useCallback((duration: number, magnitude: number) => {
    if (settings.gamepadRumble.current) {
      gamepad.vibrate(gamepadIndex.current, duration, magnitude);
    }
  }, [gamepad, gamepadIndex, settings.gamepadRumble]);
};
