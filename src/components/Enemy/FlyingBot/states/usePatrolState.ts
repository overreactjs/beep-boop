import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UseFlyingMovementResult } from "../../../../hooks";
import { FlyingBotState } from "../../../../state";

export const usePatrolState = (movement: UseFlyingMovementResult): StateFunction<FlyingBotState> => {
  return useCallback((fsm) => {
    if (fsm.age === 0) {
      const dx = 0.020 * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.velocity.current = [dx, 0.012];
    }

    if (movement.wallToLeft.current || movement.wallToRight.current) {
      fsm.entity.reverse();
      movement.wallToLeft.current = false;
      movement.wallToRight.current = false;
    }
  }, [movement]);
};
