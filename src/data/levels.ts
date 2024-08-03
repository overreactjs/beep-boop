import { Position } from '@overreact/engine';
import { Direction, EnemyType, LevelData, LevelMetadata, LevelPortalData } from '../types';
import { EnemyState, BounceBotState, FlyingBotState, GuardBotState, SecurityBotState, RollingBotState, PathfinderBotState, TeleportBotState, RedOgreState, InvertedBotState } from '../state';
import { EMPTY, ENEMIES, LEFT, PORTAL, RIGHT, SOLID, SPECIAL } from './constants';
import { GreenOgreState } from '../state/enemies/GreenOgreState';

const DEMO_LEVEL_COUNT = 40;

export async function buildLevels(): Promise<LevelData[]> {
  const modules = import.meta.glob('./levels/*.txt', { query: '?raw' });
  const keys = Object.keys(modules).filter(name => !name.includes('template')).sort();
  const count = import.meta.env.DEV ? keys.length : Math.min(keys.length, DEMO_LEVEL_COUNT);
  const levels: LevelData[] = [];

  for (let i = 0; i < count; i++) {
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
    ...buildLevelItemSpecials(lines),
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
  const foreground: number[] = [];
  const background: number[] = [];
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
          collisions.push(['block', 'platform', 'left', 'right']);
        } else {
          collisions.push(['block', 'platform', 'bottom']);
        }

      } else if (y === 24) {
        if (isSolid(x, y - 1)) {
          collisions.push(['block', 'platform', 'left', 'right']);
        } else {
          collisions.push(['block', 'platform', 'top']);
        }
      
      } else {
        const tags = new Set(['block', 'platform']);

        // Nothing above? It's a platform.
        if (!isSolid(x, y - 1)) {
          tags.add('top');
        }

        // Nothing below? It's a ceiling.
        if (!isSolid(x, y + 1)) {
          tags.add('bottom');
        }

        // Nothing to the left, and there's something either above or below.
        if (!isSolid(x - 1, y) && (isSolid(x, y + 1) || isSolid(x, y - 1))) {
          tags.add('left');
        }

        // Nothing to the right, and there's something either above or below.
        if (!isSolid(x + 1, y) && (isSolid(x, y + 1) || isSolid(x, y - 1))) {
          tags.add('right');
        }

        // Solid to the left, but above and below are both solid.
        if (isSolid(x - 1, y) && isSolid(x, y + 1) && isSolid(x, y - 1) && (!isSolid(x - 1, y - 1) || !isSolid(x - 1, y + 1))) {
          tags.add('left');
        }

        // Solid to the right, but above and below are also both solid.
        if (isSolid(x + 1, y) && isSolid(x, y + 1) && isSolid(x, y - 1) && (!isSolid(x + 1, y - 1) || !isSolid(x + 1, y + 1))) {
          tags.add('right');
        }

        // Nothing to the left, but steps either above or below.
        if (!isSolid(x - 1, y) && (isSolid(x - 1, y - 1) || isSolid(x - 1, y + 1))) {
          tags.add('left');
        }

        // Nothing to the right, but steps either above or below.
        if (!isSolid(x + 1, y) && (isSolid(x + 1, y - 1) || isSolid(x + 1, y + 1))) {
          tags.add('right');
        }

        // Right edge of the level is always solid, apart from directly above a portal.
        if (x >= 30 && isSolid(x, y + 1)) {
          tags.add('left');
        }

        // Left edge of the level is always solid, apart from directly above a portal.
        if (x <= 1 && isSolid(x, y + 1)) {
          tags.add('right');
        }

        collisions.push([...tags]);
      }
    } else {
      collisions.push(false);
    }
  };

  const buildTile = (x: number, y: number) => {
    if (meta.scheme === 'autotile') {
      buildAutotile(x, y);
    } else {
      buildRegularTile(x, y);
    }
  };

  const buildRegularTile = (x: number, y: number) => {
    if (isSolid(x, y)) {
      background.push(-1);

      if ((x === 0 || x === 30) && y < 24) {
        foreground.push(offset + (y % 2 === 0 ? 0 : 2));
      } else if ((x === 1 || x === 31) && y < 24) {
        foreground.push(offset + (y % 2 === 0 ? 1 : 3));
      } else {
        foreground.push(offset + 4 + (Math.round(Math.random())));
      }
    } else {
      foreground.push(-1);
      buildBackgroundTile(x, y);
    }
  };

  const buildAutotile = (x: number, y: number) => {
    if (isSolid(x, y)) {
      const n = +(y > 0 && isSolid(x, y - 1));
      const e = +(x < 31 && isSolid(x + 1, y));
      const s = +(y < 24 && isSolid(x, y + 1));
      const w = +(x > 0 && isSolid(x - 1, y));
      const index = n + (e << 1) + (s << 2) + (w * 20);
      foreground.push(offset + index);
      background.push(-1);
    } else {
      foreground.push(-1);
      buildBackgroundTile(x, y);
    }
  };

  const buildBackgroundTile = (x: number, y: number) => {
    const hasAbove = y > 0 && isSolid(x, y - 1);
    const hasLeft = x > 0 && isSolid(x - 1, y);
    const hasAboveLeft = y > 0 && x > 0 && isSolid(x - 1, y - 1);

    const bg = offset + 8;

    if (hasAbove && hasLeft) {
      background.push(bg);
    } else if (hasAbove) {
      background.push(bg + (hasAboveLeft || x === 0 ? 1 : 4));
    } else if (hasLeft) {
      background.push(bg + (hasAboveLeft ? 2 : 5));
    } else if (hasAboveLeft) {
      background.push(bg + 3);
    } else {
      background.push(-1);
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

  const buildFlyingBotCollisions = (x: number) => {
    background.push(-1);
    foreground.push(-1);
    collisions.push(isSolid(x, 0) ? ['block'] : false);
  }

  // Add an extra row of tiles above, for vertical portal collisions of flying bots.
  for (let x = 0; x < 32; x++) {
    buildFlyingBotCollisions(x);
  }

  // Primary level arena tiles and collisions.
  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      buildCollisions(x, y);
      buildTile(x, y);
      buildPortal(x, y);
    }
  }

  // Add an extra row of tiles below, for vertical portal collisions of flying bots.
  for (let x = 0; x < 32; x++) {
    buildFlyingBotCollisions(x);
  }

  return { foreground, background, collisions, portals };
}

function buildLevelItemTargets(data: string[]): Pick<LevelData, 'targets'> {
  const targets: Position[] = [];

  for (let y = 2; y < 25; y++) {
    for (let x = 3; x < 30; x++) {
      if ((data[y][x-1] === SOLID || data[y][x] === SOLID)
        && data[y-1][x-1] === EMPTY
        && data[y-1][x] === EMPTY) {
        targets.push([x * 8, y * 8]);
      }
    }
  }

  return { targets };
}

function buildLevelItemSpecials(data: string[]): Pick<LevelData, 'specials'> {
  const specials: Position[] = [];

  for (let y = 2; y < 25; y++) {
    for (let x = 3; x < 30; x++) {
      if (data[y][x] === SPECIAL && data[y][x+1] === SPECIAL) {
        specials.push([(x + 1) * 8, (y + 1) * 8]);
      }
    }
  }

  return { specials };
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
    case 'greenOgre':
      return new GreenOgreState(pos, direction);
    case 'guardBot':
      return new GuardBotState(pos, direction);
    case 'invertedBot':
      return new InvertedBotState(pos, direction);
    case 'pathfinderBot':
      return new PathfinderBotState(pos, direction);
    case 'redOgre':
      return new RedOgreState(pos, direction);
    case 'rollingBot':
      return new RollingBotState(pos, direction);
    case 'securityBot':
      return new SecurityBotState(pos, direction);
    case 'teleportBot':
      return new TeleportBotState(pos, direction);
  }
}
