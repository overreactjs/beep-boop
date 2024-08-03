import { Position, Property, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { FlyingStarColor, PlayerIndex, ProjectileType } from "../types";
import { GameState } from "./GameState";
import { VariableProperty } from "@overreact/engine";

class BaseProjectileState extends PositionedObjectState {
  game: GameState;

  constructor(game: GameState, pos: Position) {
    super(pos);
    this.game = game;
  }

  destroy() {
    this.game.projectiles = this.game.projectiles.filter(({ id }) => id !== this.id);
  }
}

class BaseHorizontalProjectileState extends BaseProjectileState {
  direction: 1 | -1;
  
  constructor(game: GameState, pos: Position, direction: 1 | -1) {
    super(game, pos);
    this.game = game;
    this.direction = direction;
  }
}

class BaseDirectionalProjectileState extends BaseProjectileState {
  velocity: Property<Velocity>;

  constructor(game: GameState, pos: Position, velocity: Velocity) {
    super(game, pos);
    this.velocity = new VariableProperty(velocity);
  }
}

export class EnemyFireballState extends BaseDirectionalProjectileState {
  readonly type: ProjectileType = 'enemyFireball';
}

export class EnemyZapState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'enemyZap';
}

export class PlayerFireballState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'playerFireball';
}

export class PlayerRainbowState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'playerRainbow';
}

export class PlayerZapState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'playerZap';
  player: PlayerIndex;
  ttl: Property<number>;

  constructor(game: GameState, pos: Position, direction: 1 | -1, player: PlayerIndex, ttl: number) {
    super(game, pos, direction);
    this.player = player;
    this.ttl = new VariableProperty(ttl);
  }
}

export class FlyingStarState extends BaseDirectionalProjectileState {
  readonly type: ProjectileType = 'flyingStar';
  player: PlayerIndex;
  color: FlyingStarColor;

  constructor(game: GameState, pos: Position, velocity: Velocity, player: PlayerIndex, color: FlyingStarColor) {
    super(game, pos, velocity);
    this.player = player;
    this.color = color;
  }
}

export type ProjectileState = 
  | EnemyFireballState
  | EnemyZapState
  | PlayerFireballState
  | PlayerRainbowState
  | PlayerZapState
  | FlyingStarState
  ;
