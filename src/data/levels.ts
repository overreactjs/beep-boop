import { Position } from '@overreact/engine';
import { Direction, EnemyType, LevelData, LevelMetadata, LevelPortalData } from '../types';
import { EnemyState, BounceBotState, FlyingBotState, GuardBotState, SecurityBotState, RollingBotState, PathfinderBotState } from '../state';
import { EMPTY, ENEMIES, LEFT, PORTAL, RIGHT, SOLID } from './constants';
import { GreenOgreState } from '../state/enemies/GreenOgreState';

export async function buildLevels(): Promise<LevelData[]> {
  const modules = import.meta.glob('./levels/*.txt', { query: '?raw' });
  const keys = Object.keys(modules).filter(name => !name.includes('template')).sort();
  const levels: LevelData[] = [];

  for (let i = 0; i < keys.length; i++) {
    const data = (await modules[keys[i]]() as { default: string }).default;
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
      case 'scheme':
        if (value === 'autotile') {
          metadata.scheme = value;
        }
        break;
    }
  }

  return metadata;
}

function buildLevelTilesAndCollisions(data: string[], meta: LevelMetadata): Pick<LevelData, 'foreground' | 'background' | 'collisions' | 'portals'> {
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
          collisions.push(['platform']);
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
        if (x <= 1 && isSolid(x, y + 1)) {
          tags.push('right');
        }
        if (x >= 30 && isSolid(x, y + 1)) {
          tags.push('left');
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
        tiles.push(offset + (y % 2 === 0 ? 0 : 2));
      } else if ((x === 1 || x === 31) && y < 24) {
        tiles.push(offset + (y % 2 === 0 ? 1 : 3));
      } else {
        tiles.push(offset + 4);
        // tiles.push(offset + parseInt(data[y][x], 10));
      }
    } else {
      buildBackgroundTile(x, y);
    }
  };

  const buildAutotile = (x: number, y: number) => {
    if (isSolid(x, y)) {
      const n = +(y > 0 && isSolid(x, y - 1));
      const e = +(x < 31 && isSolid(x + 1, y));
      const s = +(y < 24 && isSolid(x, y + 1));
      const w = +(x > 0 && isSolid(x - 1, y));
      const index = n + (e << 1) + (s << 2) + (w << 3);
      tiles.push(offset + index);
    } else {
      buildBackgroundTile(x, y);
    }
  };

  const buildBackgroundTile = (x: number, y: number) => {
    const hasAbove = y > 0 && isSolid(x, y - 1);
    const hasLeft = x > 0 && isSolid(x - 1, y);
    const hasAboveLeft = y > 0 && x > 0 && isSolid(x - 1, y - 1);

    const bg = meta.scheme === 'autotile' ? 0 : offset + 8;

    if (hasAbove && hasLeft) {
      tiles.push(bg);
    } else if (hasAbove) {
      tiles.push(bg + (hasAboveLeft || x === 0 ? 1 : 4));
    } else if (hasLeft) {
      tiles.push(bg + (hasAboveLeft ? 2 : 5));
    } else if (hasAboveLeft) {
      tiles.push(bg + 3);
    } else {
      tiles.push(-1);
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
      meta.scheme === 'autotile' ? buildAutotile(x, y) : buildTile(x, y);
      buildPortal(x, y);
    }
  }

  const foreground = tiles.map((tile) => tile >= 10 ? tile : -1);
  const background = tiles.map((tile) => tile >= 10 ? -1 : tile);

  return { foreground, background, collisions, portals };
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
        const c = data[y][x+1];

        if (ENEMIES[c]) {
          enemies.push(createEnemy(ENEMIES[c], [(x + 1) * 8, (y + 1) * 8 + offset], 'left'));
        }
      }

      if (data[y][x] === RIGHT) {
        const c = data[y][x-1];

        if (ENEMIES[c]) {
          enemies.push(createEnemy(ENEMIES[c], [x * 8, (y + 1) * 8 + offset], 'right'));
        }
      }
    }
  }

  return { enemies };
}

export function createEnemy(type: EnemyType, pos: Position, direction: Direction): EnemyState {
  switch (type) {
    case 'bounceBot':
      return new BounceBotState(pos, direction);
    case 'flyingBot':
      return new FlyingBotState(pos, direction);
    case 'guardBot':
      return new GuardBotState(pos, direction);
    case 'pathfinderBot':
      return new PathfinderBotState(pos, direction);
    case 'rollingBot':
      return new RollingBotState(pos, direction);
    case 'securityBot':
      return new SecurityBotState(pos, direction);
    case 'greenOgre':
      return new GreenOgreState(pos, direction);
  }
}
