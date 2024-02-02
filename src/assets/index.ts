import { BitmapAsset, BitmapFontFace, BitmapSpriteAsset, Tileset } from "@overreact/engine";

import arcadeFontUrl from "./fonts/arcade-font.png";
import arcadeFontGreenUrl from "./fonts/arcade-font-green.png";
import arcadeFontBlueUrl from "./fonts/arcade-font-blue.png";
import arcadeFontRedUrl from "./fonts/arcade-font-red.png";
import levelsFontUrl from "./fonts/levels-font.png";

import itemsUrl from "./items.png";
import mysteryUrl from "./mystery.png";
import pointsUrl from "./points.png";
import tilesetUrl from "./tileset.png";
import zapUrl from "./zap.png";

const BASE_ARCADE_FONT: Pick<BitmapFontFace, 'glyphSize' | 'glyphs'> = {
  glyphSize: [8, 8],
  glyphs: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .',
};

export const ARCADE_FONT: BitmapFontFace = {
  ...BASE_ARCADE_FONT,
  image: {
    url: arcadeFontUrl,
    size: [128, 48],
  },
};

export const ARCADE_FONT_GREEN: BitmapFontFace = {
  ...BASE_ARCADE_FONT,
  image: {
    url: arcadeFontGreenUrl,
    size: [128, 48],
  },
};

export const ARCADE_FONT_BLUE: BitmapFontFace = {
  ...BASE_ARCADE_FONT,
  image: {
    url: arcadeFontBlueUrl,
    size: [128, 48],
  },
};

export const ARCADE_FONT_RED: BitmapFontFace = {
  ...BASE_ARCADE_FONT,
  image: {
    url: arcadeFontRedUrl,
    size: [128, 48],
  },
};

export const LEVELS_FONT: BitmapFontFace = {
  image: {
    url: levelsFontUrl,
    size: [80, 16],
  },
  glyphSize: [8, 16],
  glyphs: '0123456789',
};

export const TILESET: Tileset = {
  image: {
    url: tilesetUrl,
    size: [160, 160],
  },
  cellSize: [8, 8],
  gridSize: [32, 25],
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
