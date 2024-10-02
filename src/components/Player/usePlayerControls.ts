import { Property, useGamepadAxisMap, useGamepadButtonMap, useKeyboardMap, useMergeProperty } from "@overreact/engine";
import { useGame, useGamepadIndex, useMergeBooleans, useSettings } from "../../hooks";
import { PlayerState } from "../../state";
import { GAMEPAD_AXIS_MAP } from "./constants";

export const usePlayerControls = (player: PlayerState): Property<boolean> => {
  const game = useGame();
  const settings = useSettings();

  // Only accept input when the player is active, alive, and the game is not paused..
  const gameActive = useMergeProperty(game.initialized, game.paused, (a, b) => a && !b);
  const controlsActive = useMergeProperty(player.alive, gameActive, (a, b) => a && b);

  // Map from keyboard input to virtual inputs.
  const keyboardActive = useMergeProperty(controlsActive, settings.keyboardAssign, (active, assign) => {
    return assign[player.player] && active;
  });
  useKeyboardMap(settings.keyBindings, keyboardActive);

  // Map from gamepad buttons to virtual inputs.
  const gamepadIndex = useGamepadIndex(player.player);
  const gamepadActive = useMergeProperty(controlsActive, gamepadIndex, (active, index) => {
    return index !== null && active;
  });
  useGamepadButtonMap(gamepadIndex, settings.buttonBindings, gamepadActive);
  
  // Map from gamepad analog input to virtual inputs.
  const gamepadAnalogActive = useMergeBooleans(gamepadActive, settings.gamepadAnalogStick);
  useGamepadAxisMap(gamepadIndex, GAMEPAD_AXIS_MAP, gamepadAnalogActive);

  return controlsActive;
};
