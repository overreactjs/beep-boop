import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class SecurityBotState extends BaseEnemyState {
  readonly type: EnemyType = 'securityBot';
}
