import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import jumpUrl from "./jump.png";
import fallUrl from "./fall.png";
import runUrl from "./run.png";
import deadUrl from "./dead.png";

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const JUMP: BitmapSpriteAsset = {
  url: jumpUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const FALL: BitmapSpriteAsset = {
  url: fallUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const RUN: BitmapSpriteAsset = {
  url: runUrl,
  size: [144, 16],
  count: 9,
  rate: 30,
};

export const DEAD: BitmapSpriteAsset = {
  url: deadUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};
