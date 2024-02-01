import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./enemy-1-idle.png";
import runUrl from "./enemy-1-run.png";
import stunnedUrl from "./enemy-1-stunned.png";

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const RUN: BitmapSpriteAsset = {
  url: runUrl,
  size: [48, 16],
  count: 3,
  rate: 10,
};

export const STUNNED: BitmapSpriteAsset = {
  url: stunnedUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};
