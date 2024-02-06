import { Position } from '@overreact/engine';
import { LevelData } from '../types';
import { EnemyState } from '../state';
import { EMPTY, ENEMIES, LEFT, RIGHT, SOLID } from './constants';

export const LEVELS = [
  buildLevel(1, (await import('./001.txt?raw')).default),
  buildLevel(2, (await import('./002.txt?raw')).default),
  buildLevel(3, (await import('./003.txt?raw')).default),
];

function buildLevel(level: number, data: string): LevelData {
  const lines = data.split('\n');
  const metadata = parseLevelMetadata(lines);

  return {
    ...metadata,
    ...buildLevelTilesAndCollisions(lines, metadata.tileset),
    ...buildLevelItemTargets(lines),
    ...buildLevelEnemies(level, lines),
  };
}

function parseLevelMetadata(data: string[]): Pick<LevelData, 'tileset'> {
  const metadata: Pick<LevelData, 'tileset'> = {
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

function buildLevelTilesAndCollisions(data: string[], tileset: number): Pick<LevelData, 'tiles' | 'collisions'> {
  const tiles: number[] = [];
  const collisions: (string[] | false)[] = [];
  const offset = tileset * 20;

  const isSolid = (x: number, y: number) => parseInt(data[y][x], 10) >= 0;

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
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

        if ((x === 0 || x === 30) && y < 24) {
          tiles.push(offset + (y % 2 === 0 ? 4 : 6));
        } else if ((x === 1 || x === 31) && y < 24) {
          tiles.push(offset + (y % 2 === 0 ? 5 : 7));
        } else {
          tiles.push(offset + parseInt(data[y][x], 10));
        }
      } else {
        collisions.push(false);

        const hasAbove = y > 0 && isSolid(x, y - 1);
        const hasLeft = x > 0 && isSolid(x - 1, y);
        const hasAboveLeft = y > 0 && x > 0 && isSolid(x - 1, y - 1);

        if (hasAbove && hasLeft) {
          tiles.push(offset + 10);
        } else if (hasAbove) {
          tiles.push(offset + (hasAboveLeft ? 11 : 14));
        } else if (hasLeft) {
          tiles.push(offset + (hasAboveLeft ? 12 : 15));
        } else if (hasAboveLeft) {
          tiles.push(offset + 13);
        } else {
          tiles.push(-1);
        }
      }
    }
  }

  return { tiles, collisions };
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