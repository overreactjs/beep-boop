import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import runUrl from "./run.png";
import stunnedUrl from "./stunned.png";

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
