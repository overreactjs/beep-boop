import { BitmapAsset } from "@overreact/engine";

import logoUrl from "./logo.png";
import boxUrl from "./box.png";
import instructionsFullUrl from "./instructionsFull.png";
import instructionsGamepadUrl from "./instructionsGamepad.png";

export const LOGO: BitmapAsset = {
  url: logoUrl,
  size: [128, 128],
};

export const BOX: BitmapAsset = {
  url: boxUrl,
  size: [104, 88],
};

export const INSTRUCTIONS_FULL: BitmapAsset = {
  url: instructionsFullUrl,
  size: [56, 16],
};

export const INSTRUCTIONS_GAMEPAD: BitmapAsset = {
  url: instructionsGamepadUrl,
  size: [56, 16],
};
