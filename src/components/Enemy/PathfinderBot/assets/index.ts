import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import stunnedUrl from "./stunned.png";

import idleAngryUrl from "./idle-angry.png";
import stunnedAngryUrl from "./stunned-angry.png";

// REGULAR ANIMATIONS

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

// ANGRY ANIMATIONS

export const IDLE_ANGRY: BitmapSpriteAsset = {
  url: idleAngryUrl,
  size: [96, 16],
  count: 6,
  rate: 6,
};

export const STUNNED_ANGRY: BitmapSpriteAsset = {
  url: stunnedAngryUrl,
  size: [96, 16],
  count: 6,
  rate: 10,
};
