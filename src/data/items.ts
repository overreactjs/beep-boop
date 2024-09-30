import { ItemConfig, ItemType } from "../types";

export const ITEMS: Record<ItemType, ItemConfig> = {
  
  /**
   * ROW 1
   */
  apple: {
    offset: [0, 0],
    value: 50,
  },
  banana: {
    offset: [16, 0],
    value: 100,
  },
  beans: {
    offset: [32, 0],
    value: 200,
  },
  cherries: {
    offset: [48, 0],
    value: 300,
  },
  chilli: {
    offset: [64, 0],
    value: 400,
  },
  corn: {
    offset: [80, 0],
    value: 500,
  },
  grapes_red: {
    offset: [96, 0],
    value: 600,
  },
  grapes_green: {
    offset: [112, 0],
    value: 700,
  },
  strawberry: {
    offset: [128, 0],
    value: 800,
  },
  mushroom_yellow: {
    offset: [144, 0],
    value: 200,
  },
  mushroom_magenta: {
    offset: [160, 0],
    value: 100,
  },
  turnip: {
    offset: [176, 0],
    value: 50,
  },
  egg: {
    offset: [192, 0],
    value: 300,
  },
  apple_red: {
    offset: [208, 0],
    value: 50,
  },
  orange: {
    offset: [224, 0],
    value: 100,
  },
  
  /**
   * ROW 2
   */
  cheese: {
    offset: [0, 16],
    value: 500,
  },
  croissant: {
    offset: [16, 16],
    value: 400,
  },
  hotdog: {
    offset: [32, 16],
    value: 600,
  },
  ice_cream: {
    offset: [48, 16],
    value: 800,
  },
  lolly: {
    offset: [64, 16],
    value: 900,
  },
  sorbet: {
    offset: [80, 16],
    value: 700,
  },
  pizza: {
    offset: [96, 16],
    value: 400,
  },
  burger: {
    offset: [112, 16],
    value: 300,
  },
  popcorn_red: {
    offset: [128, 16],
    value: 100,
  },
  popcorn_blue: {
    offset: [144, 16],
    value: 200,
  },
  noodles: {
    offset: [160, 16],
    value: 200,
  },
  cocktail: {
    offset: [176, 16],
    value: 300,
  },
  steak: {
    offset: [192, 16],
    value: 800,
  },
  lolly_red: {
    offset: [208, 16],
    value: 500,
  },

  /**
   * ROW 3
   */
  diamond: {
    offset: [0, 32],
    value: 1000,
  },
  ruby: {
    offset: [16, 32],
    value: 2000,
  },
  sapphire: {
    offset: [32, 32],
    value: 3000,
  },
  emerald: {
    offset: [48, 32],
    value: 4000,
  },
  amethyst: {
    offset: [64, 32],
    value: 5000,
  },
  topaz: {
    offset: [80, 32],
    value: 6000,
  },
  gold_coin: {
    offset: [96, 32],
    value: 2000,
  },
  silver_coin: {
    offset: [112, 32],
    value: 1000,
  },
  star_yellow: {
    offset: [128, 32],
    value: 1000,
  },
  star_green: {
    offset: [144, 32],
    value: 1000,
  },
  star_red: {
    offset: [160, 32],
    value: 1000,
  },
  star_magenta: {
    offset: [176, 32],
    value: 1000,
  },
  star_cyan: {
    offset: [192, 32],
    value: 1000,
  },

  /**
   * ROW 4
   */
  hot_sauce: {
    offset: [0, 48],
    value: 1000,
    label: 'hotsauce',
  },
  joystick: {
    offset: [32, 48],
    value: 1000,
  },
  dynamite: {
    offset: [64, 48],
    value: 1000,
    label: 'boom',
  },
  potion_blue: {
    offset: [96, 48],
    value: 1000,
  },
  potion_magenta: {
    offset: [112, 48],
    value: 1000,
  },
  chest_gold: {
    offset: [144, 48],
    value: 2000,
  },
  chest_silver: {
    offset: [160, 48],
    value: 1000,
  },
  teleporter: {
    offset: [208, 48],
    value: 10000,
    particles: '#f0f',
  },
  rainbow: {
    offset: [224, 48],
    value: 1000,
  },
  
  /**
   * ROW 5
   */
  circuit_1r: {
    offset: [0, 64],
    value: 1000,
  },
  circuit_2o: {
    offset: [16, 64],
    value: 1000,
  },
  circuit_3b: {
    offset: [32, 64],
    value: 1000,
  },
  circuit_4o: {
    offset: [48, 64],
    value: 1000,
  },
  circuit_5t: {
    offset: [64, 64],
    value: 1000,
  },
};

export const ALL_ITEM_TYPES = Object.keys(ITEMS) as ItemType[];

export const REGULAR_ITEMS: ItemType[] = [
  'apple',
  'banana',
  'beans',
  'cherries',
  'chilli',
  'corn',
  'grapes_red',
  'grapes_green',
  'strawberry',
  'mushroom_yellow',
  'mushroom_magenta',
  'turnip',
  'egg',
  'apple_red',
  'orange',

  // row 2
  'cheese',
  'croissant',
  'hotdog',
  'ice_cream',
  'lolly',
  'sorbet',
  'pizza',
  'burger',
  'popcorn_red',
  'popcorn_blue',
  'noodles',
  'cocktail',
  'steak',
  'lolly_red',

  // row 3
  'diamond',
  'ruby',
  'sapphire',
  'emerald',
  'amethyst',
  'topaz',
  'gold_coin',
  'silver_coin',

  // row 5
  'circuit_1r',
  'circuit_2o',
  'circuit_3b',
  'circuit_4o',
  'circuit_5t',
];

export const SPECIAL_ITEMS: ItemType[] = [
  // row 3
  'star_yellow',
  'star_green',
  'star_red',
  'star_magenta',
  'star_cyan',

  // row 4
  'hot_sauce',
  'joystick',
  'dynamite',
  'potion_blue',
  'potion_magenta',
  'chest_gold',
  'chest_silver',
  // 'teleporter',
  'rainbow',
];
