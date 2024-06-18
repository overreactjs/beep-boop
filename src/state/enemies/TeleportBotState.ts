import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class TeleportBotState extends BaseEnemyState {
  readonly type: EnemyType = 'teleportBot';
}
