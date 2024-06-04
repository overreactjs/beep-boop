import {
  BaseBossState,
  BaseEnemyState,
  BounceBotState,
  FlyingBotState,
  GuardBotState,
  PathfinderBotState,
  RollingBotState,
  SecurityBotState,
  GreenOgreState,
} from "./enemies";

export {
  BaseBossState,
  BaseEnemyState,
  BounceBotState,
  FlyingBotState,
  GuardBotState,
  PathfinderBotState,
  RollingBotState,
  SecurityBotState,
  GreenOgreState,
};

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | PathfinderBotState
  | RollingBotState
  | SecurityBotState
  | GreenOgreState
  ;
