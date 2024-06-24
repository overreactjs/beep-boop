import { BitmapSpriteAsset } from "@overreact/engine";

import idlePlayer1Url from "./idle-p1.png";
import jumpPlayer1Url from "./jump-p1.png";
import fallPlayer1Url from "./fall-p1.png";
import runPlayer1Url from "./run-p1.png";
import deadPlayer1Url from "./dead-p1.png";

import idlePlayer2Url from "./idle-p2.png";
import jumpPlayer2Url from "./jump-p2.png";
import fallPlayer2Url from "./fall-p2.png";
import runPlayer2Url from "./run-p2.png";
import deadPlayer2Url from "./dead-p2.png";
import inactivePlayer2Url from "./inactive-p2.png";

// PLAYER 1

export const IDLE_P1: BitmapSpriteAsset = {
  url: idlePlayer1Url,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const JUMP_P1: BitmapSpriteAsset = {
  url: jumpPlayer1Url,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const FALL_P1: BitmapSpriteAsset = {
  url: fallPlayer1Url,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const RUN_P1: BitmapSpriteAsset = {
  url: runPlayer1Url,
  size: [144, 16],
  count: 9,
  rate: 30,
};

export const DEAD_P1: BitmapSpriteAsset = {
  url: deadPlayer1Url,
  size: [144, 16],
  count: 9,
  rate: 10,
};

// PLAYER 2

export const IDLE_P2: BitmapSpriteAsset = {
  url: idlePlayer2Url,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const JUMP_P2: BitmapSpriteAsset = {
  url: jumpPlayer2Url,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const FALL_P2: BitmapSpriteAsset = {
  url: fallPlayer2Url,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const RUN_P2: BitmapSpriteAsset = {
  url: runPlayer2Url,
  size: [144, 16],
  count: 9,
  rate: 30,
};

export const DEAD_P2: BitmapSpriteAsset = {
  url: deadPlayer2Url,
  size: [144, 16],
  count: 9,
  rate: 10,
};

export const INACTIVE_P2: BitmapSpriteAsset = {
  url: inactivePlayer2Url,
  size: [80, 24],
  count: 2,
  rate: 1,
};
