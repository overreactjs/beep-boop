import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UseFlyingMovementResult, UsePlatformMovementResult, useBaseDeadState } from "../../../../hooks";
import { PathfinderBotState } from "../../../../state";

export function useDeadState(pathfinder: UseFlyingMovementResult, platform: UsePlatformMovementResult): StateFunction<PathfinderBotState> {
  const upstream = useBaseDeadState();

  return useCallback((fsm, delta) => {
    if (fsm.age.current === 0) {
      pathfinder.enabled.current = false;
      platform.enabled.current = true;
    }

    upstream(fsm, delta);
  }, [pathfinder, platform, upstream]);
}
