import { BitmapSpriteAsset } from "@overreact/engine";

import zapPlayer1Url from "./zap-p1.png";
import zapPlayer1FlashUrl from "./zap-flash-p1.png";

import zapPlayer2Url from "./zap-p2.png";
import zapPlayer2FlashUrl from "./zap-flash-p2.png";

export const ZAP_P1_SPRITE: BitmapSpriteAsset = {
  url: zapPlayer1Url,
  size: [8, 8],
  count: 1,
  rate: 10,
};

export const ZAP_FLASH_P1_SPRITE: BitmapSpriteAsset = {
  url: zapPlayer1FlashUrl,
  size: [16, 8],
  count: 2,
  rate: 30,
};

export const ZAP_P2_SPRITE: BitmapSpriteAsset = {
  url: zapPlayer2Url,
  size: [8, 8],
  count: 1,
  rate: 10,
};

export const ZAP_FLASH_P2_SPRITE: BitmapSpriteAsset = {
  url: zapPlayer2FlashUrl,
  size: [16, 8],
  count: 2,
  rate: 30,
};
