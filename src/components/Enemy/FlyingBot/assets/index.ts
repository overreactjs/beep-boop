import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import stunnedUrl from "./stunned.png";

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const STUNNED: BitmapSpriteAsset = {
  url: stunnedUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};
