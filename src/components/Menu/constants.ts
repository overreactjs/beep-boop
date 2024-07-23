import { GamepadButtonName } from "@overreact/engine";

export const SELECTION_COOLDOWN = 600;

export const KEYBOARD_MAP: Record<string, string> = {
  Escape: 'menu_back',
  ArrowUp: 'menu_up',
  ArrowDown: 'menu_down',
  ArrowLeft: 'menu_left',
  ArrowRight: 'menu_right',
  Enter: 'menu_select',
  Space: 'menu_select',
  KeyW: 'menu_up',
  KeyS: 'menu_down',
  KeyA: 'menu_left',
  KeyD: 'menu_right',
};

export const GAMEPAD_MAP: Partial<Record<GamepadButtonName, string>> = {
  Up: 'menu_up',
  Down: 'menu_down',
  Left: 'menu_left',
  Right: 'menu_right',
  A: 'menu_select',
  B: 'menu_back',
};
