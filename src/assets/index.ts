import { BitmapAsset, BitmapFontFace, BitmapSpriteAsset, Tileset } from "@overreact/engine";

import arcadeFontUrl from "./arcade.png";
import enemy1RunUrl from "./enemy-1-run.png";
import enemy1IdleUrl from "./enemy-1-idle.png";
import enemy1StunnedUrl from "./enemy-1-stunned.png";
import itemsUrl from "./items.png";
import mysteryUrl from "./mystery.png";
import player1Url from "./player1.png";
import pointsUrl from "./points.png";
import tilesetUrl from "./tileset.png";
import zapUrl from "./zap.png";

export const ARCADE_FONT: BitmapFontFace = {
  image: {
    url: arcadeFontUrl,
    size: [128, 48],
  },
  glyphSize: [8, 8],
  glyphs: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .',
};

export const TILESET: Tileset = {
  image: {
    url: tilesetUrl,
    size: [160, 160],
  },
  cellSize: [8, 8],
  gridSize: [32, 25],
};

export const PLAYER1_IMAGE: BitmapAsset = {
  url: player1Url,
  size: [16, 16],
};

export const ITEM_IMAGE: BitmapAsset = {
  url: itemsUrl,
  size: [256, 64],
};

export const MYSTERY_SPRITE: BitmapSpriteAsset = {
  url: mysteryUrl,
  size: [384, 16],
  count: 24,
  rate: 10,
};

export const POINTS_IMAGE: BitmapAsset = {
  url: pointsUrl,
  size: [24, 320],
};

export const ZAP_IMAGE: BitmapAsset = {
  url: zapUrl,
  size: [8, 8],
};

export const ENEMY_1_IDLE: BitmapSpriteAsset = {
  url: enemy1IdleUrl,
  size: [16, 16],
  count: 1,
  rate: 10,
};

export const ENEMY_1_RUN: BitmapSpriteAsset = {
  url: enemy1RunUrl,
  size: [48, 16],
  count: 3,
  rate: 10,
};

export const ENEMY_1_STUNNED: BitmapSpriteAsset = {
  url: enemy1StunnedUrl,
  size: [144, 16],
  count: 9,
  rate: 10,
};
