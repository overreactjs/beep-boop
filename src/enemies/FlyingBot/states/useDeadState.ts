import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UsePlatformMovementResult, UseFlyingMovementResult, useBaseDeadState } from "../../../hooks";
import { FlyingBotState } from "../../../state";

export function useDeadState(flying: UseFlyingMovementResult, platform: UsePlatformMovementResult): StateFunction<FlyingBotState> {
  const upstream = useBaseDeadState();

  return useCallback((fsm, delta) => {
    if (fsm.age === 0) {
      flying.enabled.current = false;
      platform.enabled.current = true;
    }

    upstream(fsm, delta);
  }, [flying, platform, upstream]);
}
