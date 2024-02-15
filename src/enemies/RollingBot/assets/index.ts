import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import rollingUrl from "./rolling.png";
import jumpingUrl from "./jumping.png";

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const ROLLING: BitmapSpriteAsset = {
  url: rollingUrl,
  size: [64, 16],
  count: 4,
  rate: 10,
};

export const JUMPING: BitmapSpriteAsset = {
  url: jumpingUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};
