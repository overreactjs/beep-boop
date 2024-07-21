import { Position, VariableProperty } from "@overreact/engine";
import { EnemyState, GameState, ItemState, PlayerState } from "./state";

export type Direction = 'left' | 'right';

export type PlayerIndex = 0 | 1;

export type PlayerColor = '#0f0' | '#0ff';

export type ProjectileType = 
  | 'enemyFireball'
  | 'enemyZap'
  | 'flyingStar'
  | 'playerFireball'
  | 'playerZap'
  ;

export type EnemyType =
  | 'bounceBot'
  | 'flyingBot'
  | 'greenOgre'
  | 'guardBot'
  | 'invertedBot'
  | 'pathfinderBot'
  | 'redOgre'
  | 'rollingBot'
  | 'securityBot'
  | 'teleportBot'
  ;

export type EnemyStates = 
  | 'stunned'
  | 'dead'
  | 'gone'
  ;

export type ItemType =

  // row 1
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

  // row 2
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

  // row 3
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

  // row 4
  | 'hot_sauce'
  | 'dynamite'
  | 'potion_blue'
  | 'potion_magenta'
  | 'chest_gold'
  | 'chest_silver'

  // row 5
  | 'circuit_1r'
  | 'circuit_2o'
  | 'circuit_3b'
  | 'circuit_4o'
  | 'circuit_5t'
  ;

export type ItemHandler = (game: GameState, player: PlayerState, item: ItemState) => void;

export type ItemConfig = {
  offset: Position;
  value: PointsValue;
  label?: PointsLabel;
};

export type RawLevelData = {
  tileset: number;
  geometry: string[];
};

export type LevelData = {
  meta: LevelMetadata;
  foreground: number[];
  background: number[];
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
  scheme?: 'autotile';
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
  | 16000
  | 32000
  | 64000
  ;

export type PointsLabel = PointsValue
  | 'boom'
  | 'hotsauce'
  ;

export type PlayerPowerupType = 
  | 'fireballs'
  | 'speed'
  | 'zapSpeed'
  | 'zapDistance'
  ;

export type GamePowerupType =
  | 'diamonds'
  | 'dynamite'
  | 'goldChest'
  | 'silverChest'
  ;

export type PlayerPowerupEnd = 'level' | 'death' | 'timer';

export type GamePowerupEnd = 'level' | 'timer';

export type Powerup<T, E> = {
  type: T;
  end: E[];
  ttl: number;
};

export type PlayerPowerup = Powerup<PlayerPowerupType, PlayerPowerupEnd>;

export type GamePowerup = Powerup<GamePowerupType, GamePowerupEnd>;

export type FlyingStarColor = 'yellow' | 'green' | 'cyan' | 'magenta' | 'red';

export type PlayerFiringMode = 'manual' | 'continuous' | 'automatic';

// TODO: Update these types in the engine.

export type EventHandler<T> = (event: T) => void;

export type UseEventTarget<E, T> = {
  addEventListener: (type: E, fn: EventHandler<T>) => void;
  removeEventListener: (type: E, fn: EventHandler<T>) => void;
};


export type UseEventListenersResult<E, T> = UseEventTarget<E, T> & {
  fireEvent: (type: E, payload: T) => void;
};

// Specialised property types.

export class BooleanProperty extends VariableProperty<boolean> {
  toggle() {
    this.current = !this.current;
  }
}

export class CannedProperty<T> extends VariableProperty<T> {
  options: T[];

  constructor(initial: T, options: T[]) {
    super(initial);
    this.options = options;
  }

  next(direction: -1 | 1 = 1) {
    const index = this.options.indexOf(this.current);
    this.current = direction === 1
      ? this.options[(index + 1) % this.options.length]
      : this.options[(index + this.options.length - 1) % this.options.length];
  }
}

// Let the typescript compiler know about the electron-specific globals.

export type WindowMode = 'fullscreen' | 'windowed';

type Engine = {
  quit: () => Promise<void>;
  getWindowMode: () => Promise<WindowMode>;
  setWindowMode: (mode: WindowMode) => Promise<void>;
};

declare global {
  interface Window {
    engine?: Engine;
  }
}
