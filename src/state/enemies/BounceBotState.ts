import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class BounceBotState extends BaseEnemyState {
  readonly type: EnemyType = 'bounceBot';
}
