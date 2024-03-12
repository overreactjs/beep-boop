import { Position } from "@overreact/engine";
import { EnemyState, GameState, ItemState } from "./state";

export type Direction = 'left' | 'right';

export type ProjectileType = 'playerZap' | 'enemyZap' | 'playerFireball';

export type EnemyType = 'bounceBot' | 'flyingBot' | 'guardBot' | 'rollingBot' | 'securityBot';

export type EnemyStates = 'stunned' | 'dead' | 'gone';

export type ItemType =
  | 'apple'
  | 'banana'
  | 'beans'
  | 'cherries'
  | 'chilli'
  | 'corn'
  | 'grapes_red'
  | 'grapes_green'
  | 'strawberry'
  | 'mushroom_yellow'
  | 'mushroom_magenta'
  | 'turnip'
  | 'egg'
  | 'cheese'
  | 'croissant'
  | 'hotdog'
  | 'ice_cream'
  | 'lolly'
  | 'sorbet'
  | 'pizza'
  | 'burger'
  | 'popcorn_red'
  | 'popcorn_blue'
  | 'noodles'
  | 'cocktail'
  | 'steak'
  | 'lolly_red'
  | 'diamond'
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'amethyst'
  | 'topaz'
  | 'gold_coin'
  | 'silver_coin'
  | 'star_yellow'
  | 'star_green'
  | 'star_red'
  | 'star_magenta'
  | 'star_cyan'
  | 'hot_sauce'
  | 'circuit_1r'
  | 'circuit_2o'
  | 'circuit_3b'
  | 'circuit_4o'
  | 'circuit_5t'
  ;

export type ItemHandler = (game: GameState, item: ItemState) => void;

export type ItemConfig = {
  offset: Position;
  value: PointsValue;
};

export type RawLevelData = {
  tileset: number;
  geometry: string[];
};

export type LevelData = {
  meta: LevelMetadata;
  tiles: number[];
  collisions: (false | string[])[];
  targets: Position[];
  enemies: EnemyState[];
  portals: LevelPortalData[];
};

export type LevelPortalData = {
  pos: Position;
  direction: 'left' | 'right';
  target: number; 
}

export type LevelMetadata = {
  tileset: number;
}

export type PointsValue = 
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000
  | 2000
  | 3000
  | 4000
  | 5000
  | 6000
  | 7000
  | 8000
  | 9000
  | 10000
  ;

export type PowerupType = 'fireballs' | 'speed';

export type PowerupEnd = 'level' | 'death';

export type Powerup = {
  type: PowerupType;
  end: PowerupEnd[];
};
