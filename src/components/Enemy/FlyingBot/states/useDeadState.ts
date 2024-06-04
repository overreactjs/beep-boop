import { useCallback } from "react";
import { Property, StateFunction, StateMachine } from "@overreact/engine";
import { UsePlatformMovementResult, UseFlyingMovementResult, useBaseDeadState } from "../../../../hooks";
import { BaseEnemyState, FlyingBotState } from "../../../../state";

export function useDeadState(maxFallSpeed: Property<number>, flying: UseFlyingMovementResult, platform: UsePlatformMovementResult): StateFunction<FlyingBotState> {
  const upstream = useBaseDeadState(maxFallSpeed);

  return useCallback((fsm, delta) => {
    if (fsm.age.current === 0) {
      flying.enabled.current = false;
      platform.enabled.current = true;
    }

    upstream(fsm as unknown as StateMachine<BaseEnemyState>, delta);
  }, [flying, platform, upstream]);
}
