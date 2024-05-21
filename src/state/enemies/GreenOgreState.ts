import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class GreenOgreState extends BaseEnemyState {
  readonly type: EnemyType = 'greenOgre';
}
