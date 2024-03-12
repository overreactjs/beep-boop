import { Position } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { ProjectileType } from "../types";

class BaseProjectileState extends PositionedObjectState {
  direction: 1 | -1;

  constructor(pos: Position, direction: 1 | -1) {
    super(pos);
    this.direction = direction;
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
