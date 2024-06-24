import { BitmapSpriteAsset } from "@overreact/engine";

import idleUrl from "./idle.png";
import runUrl from "./run.png";
import stunnedUrl from "./stunned.png";
import teleportOutUrl from "./teleport-out.png";
import teleportInUrl from "./teleport-in.png";

import idleAngryUrl from "./idle-angry.png";
import runAngryUrl from "./run-angry.png";
import stunnedAngryUrl from "./stunned-angry.png";
import teleportOutAngryUrl from "./teleport-out-angry.png";
import teleportInAngryUrl from "./teleport-in-angry.png";

// REGULAR ANIMATIONS

export const IDLE: BitmapSpriteAsset = {
  url: idleUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const RUN: BitmapSpriteAsset = {
  url: runUrl,
  size: [64, 16],
  count: 4,
  rate: 10,
};

export const STUNNED: BitmapSpriteAsset = {
  url: stunnedUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};

export const TELEPORT_OUT: BitmapSpriteAsset = {
  url: teleportOutUrl,
  size: [112, 16],
  count: 7,
  rate: 10,
};

export const TELEPORT_IN: BitmapSpriteAsset = {
  url: teleportInUrl,
  size: [224, 16],
  count: 14,
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
  size: [64, 16],
  count: 4,
  rate: 10,
};

export const STUNNED_ANGRY: BitmapSpriteAsset = {
  url: stunnedAngryUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};

export const TELEPORT_OUT_ANGRY: BitmapSpriteAsset = {
  url: teleportOutAngryUrl,
  size: [112, 16],
  count: 7,
  rate: 10,
};

export const TELEPORT_IN_ANGRY: BitmapSpriteAsset = {
  url: teleportInAngryUrl,
  size: [224, 16],
  count: 14,
  rate: 10,
};

