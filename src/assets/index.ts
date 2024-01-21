import { BitmapAsset, Size, Tileset } from "@overreact/engine";

import arcadeFontUrl from "./arcade.png";
import tilesetUrl from "./tileset.png";

export type BitmapFontFace = {
  image: BitmapAsset;
  characterSize: Size;
  characters: string;
}

export const ARCADE_FONT: BitmapFontFace = {
  image: {
    url: arcadeFontUrl,
    size: [128, 48],
  },
  characterSize: [8, 8],
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .',
};

export const TILESET: Tileset = {
  image: {
    url: tilesetUrl,
    size: [80, 80],
  },
  cellSize: [8, 8],
  gridSize: [32, 25],
};
