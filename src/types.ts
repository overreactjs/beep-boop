import { Position } from "@overreact/engine";

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
};

export type RawLevelData = {
  geometry: string[];
  enemies: string[];
};

export type LevelData = {
  tiles: number[];
  collisions: (false | string)[];
  targets: Position[];
};