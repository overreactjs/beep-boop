import { BitmapAsset } from "@overreact/engine";

const cache: Map<string, HTMLImageElement> = new Map();

const element: HTMLDivElement = document.createElement('div');

export const useBitmapPreload = (bitmaps: BitmapAsset[]) => {
  if (!element.parentElement) {
    document.body.appendChild(element);
    element.style.display = 'none';
  }

  for (const { url } of bitmaps) {
    if (!cache.has(url)) {
      const image = new Image();
      image.src = url;
      element.appendChild(image);

      cache.set(url, image);
    }
  }
};
