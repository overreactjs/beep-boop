import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UseBubbleBobbleMovementResult, UseFlyingMovementResult, useDeadState } from "../../../hooks";
import { FlyingBotState } from "../../../state";

export function useFlyingBotDeadState(flying: UseFlyingMovementResult, platform: UseBubbleBobbleMovementResult): StateFunction<FlyingBotState> {
  const upstream = useDeadState();

  return useCallback((fsm, delta) => {
    if (fsm.age === 0) {
      flying.enabled.current = false;
      platform.enabled.current = true;
    }

    upstream(fsm, delta);
  }, [flying, platform, upstream]);
}
