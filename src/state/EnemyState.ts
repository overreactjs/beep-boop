import {
  BaseBossState,
  BaseEnemyState,
  BounceBotState,
  FlyingBotState,
  GuardBotState,
  PathfinderBotState,
  RollingBotState,
  SecurityBotState,
  TeleportBotState,
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
  TeleportBotState,
  GreenOgreState,
};

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | PathfinderBotState
  | RollingBotState
  | SecurityBotState
  | TeleportBotState
  | GreenOgreState
  ;
