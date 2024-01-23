import { Position } from '@overreact/engine';
import { LevelData, RawLevelData } from '../types';

export const LEVELS = [
  buildLevel((await import('./level001.json')).default),
];

function buildLevel(data: RawLevelData): LevelData {
  return {
    ...buildLevelTilesAndCollisions(data.geometry),
    ...buildLevelItemTargets(data.geometry),
  };
}

function buildLevelTilesAndCollisions(geometry: string[]): Pick<LevelData, 'tiles' | 'collisions'> {
  const tiles: number[] = [];
  const collisions: (string | false)[] = [];

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      if (geometry[y][x] === '1') {
        collisions.push('platform');

        if (x === 0 || x === 30) {
          tiles.push(y % 2 === 0 ? 14 : 16);
        } else if (x === 1 || x === 31) {
          tiles.push(y % 2 === 0 ? 15 : 17);
        } else {
          tiles.push(10);
        }
      } else {
        collisions.push(false);

        const hasAbove = y > 0 && geometry[y-1][x] === '1';
        const hasLeft = x > 0 && geometry[y][x-1] === '1';
        const hasAboveLeft = y > 0 && x > 0 && geometry[y-1][x-1] === '1';

        if (hasAbove && hasLeft) {
          tiles.push(0);
        } else if (hasAbove) {
          tiles.push(hasAboveLeft ? 1 : 4);
        } else if (hasLeft) {
          tiles.push(hasAboveLeft ? 2 : 5);
        } else if (hasAboveLeft) {
          tiles.push(3);
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
      if ((geometry[y][x-1] === '1' || geometry[y][x] === '1')
        && geometry[y-2][x-1] === '0'
        && geometry[y-2][x] === '0'
        && geometry[y-1][x-1] === '0'
        && geometry[y-1][x] === '0') {
        targets.push([x * 8, y * 8]);
      }
    }
  }

  return { targets };
}