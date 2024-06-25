import { BitmapFontFace, Tileset } from "@overreact/engine";

import levelsFontUrl from "./levels-font.png";
import tilesetUrl from "./tileset.png";

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
    size: [160, 800],
  },
  cellSize: [8, 8],
  tileSize: [8, 8],
  gridSize: [32, 25],
};