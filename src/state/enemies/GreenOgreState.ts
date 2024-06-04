import { EnemyType } from "../../types";
import { BaseBossState } from "./BaseBossState";

export class GreenOgreState extends BaseBossState {
  readonly type: EnemyType = 'greenOgre';
}
