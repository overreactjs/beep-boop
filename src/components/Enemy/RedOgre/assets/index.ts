import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import teleportUrl from "./teleport.png";

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [32, 32],
  count: 1,
  rate: 10,
};

export const TELEPORT: BitmapSpriteAsset = {
  url: teleportUrl,
  size: [32, 32],
  count: 1,
  rate: 10,
};
