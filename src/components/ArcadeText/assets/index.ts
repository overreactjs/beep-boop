import { BitmapFontFace } from "@overreact/engine";

import arcadeFontUrl from "./arcade-font.png";
import arcadeFontGreenUrl from "./arcade-font-green.png";
import arcadeFontBlueUrl from "./arcade-font-blue.png";
import arcadeFontRedUrl from "./arcade-font-red.png";

const BASE_ARCADE_FONT: Pick<BitmapFontFace, 'glyphSize' | 'glyphs'> = {
  glyphSize: [8, 8],
  glyphs: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -.,:;/\\<>↑↓!~©[]?\'"',
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
