import { Position } from '@overreact/engine';
import { EnemyType, LevelData, RawLevelData } from '../types';
import { EnemyState } from '../state';

const SOLID = '0';
const EMPTY = ' ';
const LEFT  = '<';
const RIGHT = '>';

const ENEMIES: Record<string, EnemyType> = {
  'A': 'standard',
};

export const LEVELS = [
  buildLevel(1, (await import('./level001.json')).default),
  buildLevel(2, (await import('./level002.json')).default),
];

function buildLevel(level: number, data: RawLevelData): LevelData {
  return {
    tileset: data.tileset,
    ...buildLevelTilesAndCollisions(data.geometry, data.tileset),
    ...buildLevelItemTargets(data.geometry),
    ...buildLevelEnemies(level, data.geometry),
  };
}

function buildLevelTilesAndCollisions(geometry: string[], tileset: number): Pick<LevelData, 'tiles' | 'collisions'> {
  const tiles: number[] = [];
  const collisions: (string | false)[] = [];
  const offset = tileset * 20;

  const isSolid = (x: number, y: number) => parseInt(geometry[y][x], 10) >= 0;

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      if (isSolid(x, y)) {
        collisions.push(y > 0 ? 'platform' : false);

        if ((x === 0 || x === 30) && y < 24) {
          tiles.push(offset + (y % 2 === 0 ? 4 : 6));
        } else if ((x === 1 || x === 31) && y < 24) {
          tiles.push(offset + (y % 2 === 0 ? 5 : 7));
        } else {
          tiles.push(offset + parseInt(geometry[y][x], 10));
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

function buildLevelItemTargets(geometry: string[]): Pick<LevelData, 'targets'> {
  const targets: Position[] = [];

  for (let y = 2; y < 25; y++) {
    for (let x = 3; x < 30; x++) {
      if ((geometry[y][x-1] === SOLID || geometry[y][x] === SOLID)
        && geometry[y-2][x-1] === EMPTY
        && geometry[y-2][x] === EMPTY
        && geometry[y-1][x-1] === EMPTY
        && geometry[y-1][x] === EMPTY) {
        targets.push([x * 8, y * 8]);
      }
    }
  }

  return { targets };
}

function buildLevelEnemies(level: number, geometry: string[]): Pick<LevelData, 'enemies'> {
  const enemies: EnemyState[] = [];
  const offset = (level - 1) * 200;

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      if (geometry[y][x] === LEFT) {
        const a = geometry[y-1][x];
        const b = geometry[y-1][x+1];
        const c = geometry[y][x+1];

        if (a === b && b === c && ENEMIES[a]) {
          enemies.push(new EnemyState(ENEMIES[a], [(x + 1) * 8, (y + 1) * 8 + offset], 'left'));
        }
      }

      if (geometry[y][x] === RIGHT) {
        const a = geometry[y-1][x-1];
        const b = geometry[y-1][x];
        const c = geometry[y][x-1];

        if (a === b && b === c && ENEMIES[a]) {
          enemies.push(new EnemyState(ENEMIES[a], [x * 8, (y + 1) * 8 + offset], 'right'));
        }
      }
    }
  }

  return { enemies };
}