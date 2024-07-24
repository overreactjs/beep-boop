import { BitmapAsset } from "@overreact/engine";

import logoUrl from "./logo.png";
import boxUrl from "./box.png";
import instructionsUrl from "./instructions.png";

export const LOGO: BitmapAsset = {
  url: logoUrl,
  size: [128, 128],
};

export const BOX: BitmapAsset = {
  url: boxUrl,
  size: [104, 88],
};

export const INSTRUCTIONS: BitmapAsset = {
  url: instructionsUrl,
  size: [56, 16],
};
