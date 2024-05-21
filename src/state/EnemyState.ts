import {
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
