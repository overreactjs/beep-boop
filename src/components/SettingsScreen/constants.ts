import { GamepadButtonName, KeyboardKeyName } from "@overreact/engine";

export const ARROWS = ['[', ']'] as [string, string];

export const KEYS: Partial<Record<KeyboardKeyName, string>> = {
  KeyA: '"A"',
  KeyB: '"B"',
  KeyC: '"C"',
  KeyD: '"D"',
  KeyE: '"E"',
  KeyF: '"F"',
  KeyG: '"G"',
  KeyH: '"H"',
  KeyI: '"I"',
  KeyJ: '"J"',
  KeyK: '"K"',
  KeyL: '"L"',
  KeyM: '"M"',
  KeyN: '"N"',
  KeyO: '"O"',
  KeyP: '"P"',
  KeyQ: '"Q"',
  KeyR: '"R"',
  KeyS: '"S"',
  KeyT: '"T"',
  KeyU: '"U"',
  KeyV: '"V"',
  KeyW: '"W"',
  KeyX: '"X"',
  KeyY: '"Y"',
  KeyZ: '"Z"',
  Digit0: '"0"',
  Digit1: '"1"',
  Digit2: '"2"',
  Digit3: '"3"',
  Digit4: '"4"',
  Digit5: '"5"',
  Digit6: '"6"',
  Digit7: '"7"',
  Digit8: '"8"',
  Digit9: '"9"',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  Space: 'SPACE',
};

export const BUTTONS: Partial<Record<GamepadButtonName, number>> = {
  A: 24,
  B: 16,
  X: 8,
  Y: 0,
  Shoulder_L1: 32,
  Shoulder_L2: 40,
  Shoulder_R1: 48,
  Shoulder_R2: 56,
  Up: 80,
  Down: 88,
  Left: 64,
  Right: 72
};
