import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class GuardBotState extends BaseEnemyState {
  readonly type: EnemyType = 'guardBot';
}
