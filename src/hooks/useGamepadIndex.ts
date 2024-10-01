import { useDynamicProperty } from "@overreact/engine";
import { PlayerIndex } from "../types";
import { useSettings } from "./useSettings";

export const useGamepadIndex = (player: PlayerIndex) => {
  const settings = useSettings();
  return useDynamicProperty(settings.gamepadAssign, (assign) => assign[player]);
};
