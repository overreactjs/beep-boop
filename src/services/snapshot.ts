import { GameState } from "../state";
import { EnemyType } from "../types";

import { TILESET } from "../components/Level/assets";
import { IDLE as BOUNCE_BOT } from "../components/Enemy/BounceBot/assets";
import { IDLE as FLYING_BOT } from "../components/Enemy/FlyingBot/assets";
import { IDLE as GREEN_OGRE } from "../components/Enemy/GreenOgre/assets";
import { IDLE as GUARD_BOT } from "../components/Enemy/GuardBot/assets";
import { IDLE as INVERTED_BOT } from "../components/Enemy/InvertedBot/assets";
import { IDLE as PATHFINDER_BOT } from "../components/Enemy/PathfinderBot/assets";
import { IDLE as RED_OGRE } from "../components/Enemy/RedOgre/assets";
import { IDLE as ROLLING_BOT } from "../components/Enemy/RollingBot/assets";
import { IDLE as SECURITY_BOT } from "../components/Enemy/SecurityBot/assets";
import { IDLE as TELEPORT_BOT } from "../components/Enemy/TeleportBot/assets";

const LEVELS = 50;
const COLUMNS = 10;

export const snapshotGame = async (game: GameState) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256 * COLUMNS;
  canvas.height = 200 * Math.ceil(LEVELS / COLUMNS);
  
  if (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < LEVELS; i++) {
      const level = await snapshotLevel(game, i + 1);
      const dx = (i % COLUMNS) * 256;
      const dy = Math.floor(i / COLUMNS) * 200;

      ctx.drawImage(level, dx, dy);
    }
  }

  // Display the image.
  document.body.appendChild(canvas);
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.imageRendering = 'pixelated';
  canvas.style.transformOrigin = '0 0';

  // Download the image.
  const url = canvas.toDataURL();
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'levels.png';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

const snapshotLevel = (game: GameState, level: number): Promise<HTMLCanvasElement> => {
  const data = game.levels[level - 1];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 200;

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => resolve(image));
    });
  };

  const images = [
    loadImage(TILESET.image.url),
    loadImage(BOUNCE_BOT.url),
    loadImage(FLYING_BOT.url),
    loadImage(GREEN_OGRE.url),
    loadImage(GUARD_BOT.url),
    loadImage(INVERTED_BOT.url),
    loadImage(PATHFINDER_BOT.url),
    loadImage(RED_OGRE.url),
    loadImage(ROLLING_BOT.url),
    loadImage(SECURITY_BOT.url),
    loadImage(TELEPORT_BOT.url),
  ];

  return Promise.all(images).then(([
    tileset,
    bounceBot,
    flyingBot,
    greenOgre,
    guardBot,
    invertedBot,
    pathfinderBot,
    redOgre,
    rollingBot,
    securityBot,
    teleportBot,
  ]) => {
    const ENEMIES: Record<EnemyType, HTMLImageElement> = {
      bounceBot,
      flyingBot,
      greenOgre,
      guardBot,
      invertedBot,
      pathfinderBot,
      redOgre,
      rollingBot,
      securityBot,
      teleportBot,
    };

    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 256, 200);

      // Foreground and background tiles.
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 25; y++) {
          const i = y * 32 + x;
          const foreground = data.foreground[i];
          const background = data.background[i];

          if (foreground >= 0) {
            const sx = (foreground % 20) * 8;
            const sy = Math.floor(foreground / 20) * 8;
            ctx.drawImage(tileset, sx, sy, 8, 8, x * 8, y * 8, 8, 8);
          }

          if (background >= 0) {
            const sx = (background % 20) * 8;
            const sy = Math.floor(background / 20) * 8;
            ctx.drawImage(tileset, sx, sy, 8, 8, x * 8, y * 8, 8, 8);
          }
        }
      }

      // Enemies.
      for (const enemy of data.enemies) {
        const [x, y] = enemy.pos.current;
        const size = level % 20 === 0 ? 32 : 16;
        const dx = x - (size / 2);
        const dy = y - ((level - 1) * 200) - size;

        if (enemy.direction.current === 'left') {
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-size, 0);
          ctx.drawImage(ENEMIES[enemy.type], 0, 0, size, size, -dx, dy, size, size);
          ctx.restore();
        } else {
          ctx.drawImage(ENEMIES[enemy.type], 0, 0, size, size, dx, dy, size, size);
        }
      }
    }

    return canvas;
  });
};
