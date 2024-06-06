import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import stunnedUrl from "./stunned.png";

import idleAngryUrl from "./idle-angry.png";
import stunnedAngryUrl from "./stunned-angry.png";

// REGULAR ANIMATIONS

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

// ANGRY ANIMATIONS

export const IDLE_ANGRY: BitmapSpriteAsset = {
  url: idleAngryUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const STUNNED_ANGRY: BitmapSpriteAsset = {
  url: stunnedAngryUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};
