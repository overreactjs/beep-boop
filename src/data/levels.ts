import { Position } from '@overreact/engine';
import { LevelData, LevelMetadata, LevelPortalData } from '../types';
import { EnemyState } from '../state';
import { EMPTY, ENEMIES, LEFT, PORTAL, RIGHT, SOLID } from './constants';

export const LEVELS = await buildLevels(6);

async function buildLevels(count: number): Promise<LevelData[]> {
  const levels: LevelData[] = [];

  for (let i = 0; i < count; i++) {
    const data = (await import(`./${String(i + 1).padStart(3, '0')}.txt?raw`)).default;
    levels.push(buildLevel(i + 1, data));
  }

  return levels;
}

function buildLevel(level: number, data: string): LevelData {
  const lines = data.split('\n');
  const meta = parseLevelMetadata(lines);

  return {
    meta,
    ...buildLevelTilesAndCollisions(lines, meta),
    ...buildLevelItemTargets(lines),
    ...buildLevelEnemies(level, lines),
  };
}

function parseLevelMetadata(data: string[]): LevelMetadata {
  const metadata: LevelMetadata = {
    tileset: 1,
  };

  for (let i = 25; i < data.length; i++) {
    const [key, value] = data[i].split(':');

    switch (key) {
      case 'tileset':
        metadata.tileset = parseInt(value, 10);
        break;
    }
  }

  return metadata;
}

function buildLevelTilesAndCollisions(data: string[], meta: LevelMetadata): Pick<LevelData, 'tiles' | 'collisions' | 'portals'> {
  const tiles: number[] = [];
  const collisions: (string[] | false)[] = [];
  const portals: LevelPortalData[] = [];
  const offset = meta.tileset * 20;

  const isSolid = (x: number, y: number) => {
    const isNumber = parseInt(data[y][x], 10) >= 0;
    const isPortal = (x === 0 && data[y][x + 1] === PORTAL) || (x === 31 && data[y][x - 1] === PORTAL);
    return isNumber && !isPortal;
  };

  const buildCollisions = (x: number, y: number) => {
    if (isSolid(x, y)) {
      if (y === 0) {
        if (isSolid(x, y + 1)) {
          collisions.push(['platform', 'left', 'right']);
        } else {
          collisions.push(false);
        }

      } else {
        const tags = ['platform'];

        if (!isSolid(x, y - 1)) {
          tags.push('top');
        }
        if (!isSolid(x - 1, y) && (isSolid(x, y + 1) || isSolid(x, y - 1))) {
          tags.push('left');
        }
        if (!isSolid(x + 1, y) && (isSolid(x, y + 1) || isSolid(x, y - 1))) {
          tags.push('right');
        }

        collisions.push(tags);
      }
    } else {
      collisions.push(false);
    }
  };

  const buildTile = (x: number, y: number) => {
    if (isSolid(x, y)) {
      if ((x === 0 || x === 30) && y < 24) {
        tiles.push(offset + (y % 2 === 0 ? 4 : 6));
      } else if ((x === 1 || x === 31) && y < 24) {
        tiles.push(offset + (y % 2 === 0 ? 5 : 7));
      } else {
        tiles.push(offset + parseInt(data[y][x], 10));
      }
    } else {
      const hasAbove = y > 0 && isSolid(x, y - 1);
      const hasLeft = x > 0 && isSolid(x - 1, y);
      const hasAboveLeft = y > 0 && x > 0 && isSolid(x - 1, y - 1);

      if (hasAbove && hasLeft) {
        tiles.push(offset + 10);
      } else if (hasAbove) {
        tiles.push(offset + (hasAboveLeft || x === 0 ? 11 : 14));
      } else if (hasLeft) {
        tiles.push(offset + (hasAboveLeft ? 12 : 15));
      } else if (hasAboveLeft) {
        tiles.push(offset + 13);
      } else {
        tiles.push(-1);
      }
    }
  };

  const buildPortal = (x: number, y: number) => {
    const target = parseInt(data[y][x], 10);
    const isPortalLeft = x === 0 && data[y][x + 1] === PORTAL;
    const isPortalRight = x === 31 && data[y][x - 1] === PORTAL;

    if (target >= 1) {
      if (isPortalLeft) {
        portals.push({ pos: [-26, y << 3], direction: 'left', target }); // -26
      } else if (isPortalRight) {
        portals.push({ pos: [266, y << 3], direction: 'right', target }); // 266
      }
    }
  };

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      buildCollisions(x, y);
      buildTile(x, y);
      buildPortal(x, y);
    }
  }

  return { tiles, collisions, portals };
}

function buildLevelItemTargets(data: string[]): Pick<LevelData, 'targets'> {
  const targets: Position[] = [];

  for (let y = 2; y < 25; y++) {
    for (let x = 3; x < 30; x++) {
      if ((data[y][x-1] === SOLID || data[y][x] === SOLID)
        && data[y-2][x-1] === EMPTY
        && data[y-2][x] === EMPTY
        && data[y-1][x-1] === EMPTY
        && data[y-1][x] === EMPTY) {
        targets.push([x * 8, y * 8]);
      }
    }
  }

  return { targets };
}

function buildLevelEnemies(level: number, data: string[]): Pick<LevelData, 'enemies'> {
  const enemies: EnemyState[] = [];
  const offset = (level - 1) * 200;

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      if (data[y][x] === LEFT) {
        const a = data[y-1][x];
        const b = data[y-1][x+1];
        const c = data[y][x+1];

        if (a === b && b === c && ENEMIES[a]) {
          enemies.push(new EnemyState(ENEMIES[a], [(x + 1) * 8, (y + 1) * 8 + offset], 'left'));
        }
      }

      if (data[y][x] === RIGHT) {
        const a = data[y-1][x-1];
        const b = data[y-1][x];
        const c = data[y][x-1];

        if (a === b && b === c && ENEMIES[a]) {
          enemies.push(new EnemyState(ENEMIES[a], [x * 8, (y + 1) * 8 + offset], 'right'));
        }
      }
    }
  }

  return { enemies };
}