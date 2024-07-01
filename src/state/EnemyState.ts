import {
  BaseBossState,
  BaseEnemyState,
  BounceBotState,
  FlyingBotState,
  GuardBotState,
  InvertedBotState,
  PathfinderBotState,
  RollingBotState,
  SecurityBotState,
  TeleportBotState,
  GreenOgreState,
  RedOgreState,
} from "./enemies";

export {
  BaseBossState,
  BaseEnemyState,
  BounceBotState,
  FlyingBotState,
  GuardBotState,
  InvertedBotState,
  PathfinderBotState,
  RollingBotState,
  SecurityBotState,
  TeleportBotState,
  GreenOgreState,
  RedOgreState,
};

export type EnemyState =
  | BounceBotState
  | FlyingBotState
  | GuardBotState
  | InvertedBotState
  | PathfinderBotState
  | RollingBotState
  | SecurityBotState
  | TeleportBotState
  | GreenOgreState
  | RedOgreState
  ;
