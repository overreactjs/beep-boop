import { GamepadButtonName } from "@overreact/engine";
import { UsePlatformMovementOptions } from "../../hooks/usePlatformMovement";

export const MOVEMENT_PROPS: UsePlatformMovementOptions = {
  gravity: [0, 0.0006],
  speed: 0.06,
  jumpStrength: 0.21,
  maxFallSpeed: 0.1,
  canTurnMidair: true,
};

export const KEYBOARD_MAPS: [Record<string, string>, Record<string, string>] = [
  { KeyA: 'left', KeyD: 'right', KeyW: 'jump', Space: 'fire' },
  { KeyJ: 'left', KeyL: 'right', KeyI: 'jump', Enter: 'fire' },
];

export const GAMEPAD_MAP: Partial<Record<GamepadButtonName, string>> = { Left: 'left', Right: 'right', A: 'jump', X: 'fire' };