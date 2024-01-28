import { Position } from "@overreact/engine";

export type Direction = 'left' | 'right';

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
  | 'hot_sauce';

export type ItemConfig = {
  offset: Position;
  value: PointsValue;
};

export type RawLevelData = {
  background: string;
  foreground: string;
  geometry: string[];
};

export type LevelData = {
  background: string;
  foreground: string;
  tiles: number[];
  collisions: (false | string)[];
  targets: Position[];
};

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
  | 10000;
