import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import stunnedUrl from "./stunned.png";

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [96, 16],
  count: 6,
  rate: 6,
};

export const STUNNED: BitmapSpriteAsset = {
  url: stunnedUrl,
  size: [96, 16],
  count: 6,
  rate: 10,
};
