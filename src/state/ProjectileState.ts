import { Position } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { ProjectileType } from "../types";
import { GameState } from "./GameState";

class BaseProjectileState extends PositionedObjectState {
  game: GameState;
  direction: 1 | -1;

  constructor(game: GameState, pos: Position, direction: 1 | -1) {
    super(pos);
    this.game = game;
    this.direction = direction;
  }

  destroy() {
    this.game.projectiles = this.game.projectiles.filter(({ id }) => id !== this.id);
  }
}

export class EnemyZapState extends BaseProjectileState {
  readonly type: ProjectileType = 'enemyZap';
}

export class PlayerFireballState extends BaseProjectileState {
  readonly type: ProjectileType = 'playerFireball';
}

export class PlayerZapState extends BaseProjectileState {
  readonly type: ProjectileType = 'playerZap';
}

export type ProjectileState = 
  | EnemyZapState
  | PlayerFireballState
  | PlayerZapState
  ;
