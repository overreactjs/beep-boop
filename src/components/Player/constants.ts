import { GamepadAxisMap, GamepadButtonMap, KeyboardMap } from "@overreact/engine";
import { UsePlatformMovementOptions } from "../../hooks/usePlatformMovement";

export const MOVEMENT_PROPS: UsePlatformMovementOptions = {
  gravity: [0, 0.0006],
  speed: 0.06,
  jumpStrength: 0.21,
  maxFallSpeed: 0.1,
  canTurnMidair: true,
};

export const KEYBOARD_MAP: KeyboardMap = {
  KeyA: 'left',
  KeyD: 'right',
  KeyW: 'jump',
  Space: 'fire',
};

export const GAMEPAD_BUTTON_MAP: GamepadButtonMap = {
  Left: 'left',
  Right: 'right',
  A: 'jump',
  X: 'fire',
};

export const GAMEPAD_AXIS_MAP: GamepadAxisMap = {
  Left_Horizontal: ['left', 'right'],
};

