import { useCallback } from "react";
import { StateFunction, StateMachine } from "@overreact/engine";
import { UseFlyingMovementResult, UsePlatformMovementResult, useBaseDeadState } from "../../../../hooks";
import { BaseEnemyState, PathfinderBotState } from "../../../../state";

export function useDeadState(flying: UseFlyingMovementResult, platform: UsePlatformMovementResult): StateFunction<PathfinderBotState> {
  const upstream = useBaseDeadState();

  return useCallback((fsm, delta) => {
    if (fsm.age.current === 0) {
      flying.enabled.current = false;
      platform.enabled.current = true;
    }

    upstream(fsm as unknown as StateMachine<BaseEnemyState>, delta);
  }, [flying, platform, upstream]);
}
