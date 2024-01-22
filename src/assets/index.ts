import { BitmapAsset, Size, Tileset } from "@overreact/engine";

import arcadeFontUrl from "./arcade.png";
import player1Url from "./player1.png";
import tilesetUrl from "./tileset.png";

export type BitmapFontFace = {
  image: BitmapAsset;
  glyphSize: Size;
  glyphs: string;
};

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
    size: [80, 80],
  },
  cellSize: [8, 8],
  gridSize: [32, 25],
};

export const PLAYER1: BitmapAsset = {
  url: player1Url,
  size: [16, 16],
};
