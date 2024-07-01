import { EnemyType } from "../../types";
import { BaseEnemyState } from "./BaseEnemyState";

export class InvertedBotState extends BaseEnemyState {
  readonly type: EnemyType = 'invertedBot';
}
