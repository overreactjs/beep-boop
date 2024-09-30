import { GamepadAxisMap, GamepadButtonMap } from "@overreact/engine";

export const SELECTION_COOLDOWN = 600;

export const KEYBOARD_MAP: Record<string, string> = {
  Escape: 'menu_back',
  ArrowUp: 'jump',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'fire',
  Space: 'fire',
};

export const GAMEPAD_BUTTON_MAP: GamepadButtonMap = {
  Up: 'jump',
  Down: 'down',
  Left: 'left',
  Right: 'right',
  A: 'fire',
  B: 'menu_back',
};

export const GAMEPAD_AXIS_MAP: GamepadAxisMap = {
  Left_Horizontal: ['left', 'right'],
  Left_Vertical: ['jump', 'down'],
};
