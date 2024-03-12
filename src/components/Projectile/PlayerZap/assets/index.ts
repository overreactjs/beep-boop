import { BitmapSpriteAsset } from "@overreact/engine";

import zapUrl from "./zap.png";
import zapFlashUrl from "./zap-flash.png";

export const ZAP_SPRITE: BitmapSpriteAsset = {
  url: zapUrl,
  size: [8, 8],
  count: 1,
  rate: 10,
};

export const ZAP_FLASH_SPRITE: BitmapSpriteAsset = {
  url: zapFlashUrl,
  size: [16, 8],
  count: 2,
  rate: 30,
};
