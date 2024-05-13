import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UseFlyingMovementResult } from "../../../../hooks";
import { FlyingBotState } from "../../../../state";

export const usePatrolState = (movement: UseFlyingMovementResult): StateFunction<FlyingBotState> => {
  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      const dx = 0.020 * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.velocity.current = [dx, 0.012];
    }

    if (movement.flags.current.horizontal) {
      fsm.entity.reverse();
    }

    if (movement.flags.current.vertical) {
      fsm.entity.velocity.current[1] = -fsm.entity.velocity.current[1];
    }
  }, [movement]);
};


