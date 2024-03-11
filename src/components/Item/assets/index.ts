import { BitmapAsset, BitmapSpriteAsset } from "@overreact/engine";

import itemsUrl from "./items.png";
import mysteryUrl from "./mystery.png";

export const ITEM_IMAGE: BitmapAsset = {
  url: itemsUrl,
  size: [256, 80],
};

export const MYSTERY_SPRITE: BitmapSpriteAsset = {
  url: mysteryUrl,
  size: [384, 16],
  count: 24,
  rate: 10,
};
