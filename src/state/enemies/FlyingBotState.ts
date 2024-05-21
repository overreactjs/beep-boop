import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class FlyingBotState extends BaseEnemyState {
  readonly type: EnemyType = 'flyingBot';
}
