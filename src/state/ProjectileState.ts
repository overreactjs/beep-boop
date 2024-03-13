import { Position, Property, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { FlyingStarColor, ProjectileType } from "../types";
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

export class EnemyZapState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'enemyZap';
}

export class PlayerFireballState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'playerFireball';
}

export class PlayerZapState extends BaseHorizontalProjectileState {
  readonly type: ProjectileType = 'playerZap';
}

export class FlyingStarState extends BaseProjectileState {
  readonly type: ProjectileType = 'flyingStar';
  velocity: Property<Velocity>;
  color: FlyingStarColor;

  constructor(game: GameState, pos: Position, velocity: Velocity, color: FlyingStarColor) {
    super(game, pos);
    this.game = game;
    this.velocity = new VariableProperty(velocity);
    this.color = color;
  }
}

export type ProjectileState = 
  | EnemyZapState
  | PlayerFireballState
  | PlayerZapState
  | FlyingStarState
  ;
