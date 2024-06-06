import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import runUrl from "./run.png";
import stunnedUrl from "./stunned.png";

import idleAngryUrl from "./idle-angry.png";
import runAngryUrl from "./run-angry.png";
import stunnedAngryUrl from "./stunned-angry.png";

// REGULAR ANIMATIONS

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

// ANGRY ANIMATIONS

export const IDLE_ANGRY: BitmapSpriteAsset = {
  url: idleAngryUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const RUN_ANGRY: BitmapSpriteAsset = {
  url: runAngryUrl,
  size: [48, 16],
  count: 3,
  rate: 10,
};

export const STUNNED_ANGRY: BitmapSpriteAsset = {
  url: stunnedAngryUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};

