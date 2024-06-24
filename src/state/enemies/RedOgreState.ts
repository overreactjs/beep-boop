import { EnemyType } from "../../types";
import { BaseBossState } from "./BaseBossState";

export class RedOgreState extends BaseBossState {
  readonly type: EnemyType = 'redOgre';

  platform = 0;
}
