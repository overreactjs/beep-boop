import { useCallback } from "react";
import { StateFunction } from "../types";

export const usePatrolState = (): StateFunction => {
  return useCallback((fsm) => {
    if (fsm.age === 0) {
      const dx = 0.020 * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.velocity.current = [dx, 0.012];
    }

    if (fsm.entity.movement?.wallToLeft.current || fsm.entity.movement?.wallToRight.current) {
      fsm.entity.reverse();
      fsm.entity.movement.wallToLeft.current = false;
      fsm.entity.movement.wallToRight.current = false;
    }
  }, []);
};
