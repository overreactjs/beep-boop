import { useCallback } from "react";
import { StateFunction } from "../types";

export const useStunnedState = (): StateFunction => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'stunned';

    if (fsm.age > 100 && fsm.entity.movement?.isOnFloor.current) {
      fsm.entity.velocity.current[0] = 0;
    }

    if (fsm.entity.movement?.wallToLeft.current || fsm.entity.movement?.wallToRight.current) {
      fsm.entity.velocity.current[0] = -fsm.entity.velocity.current[0];
      fsm.entity.reverse();
      fsm.entity.movement.wallToLeft.current = false;
      fsm.entity.movement.wallToRight.current = false;
    }
  }, []);
};
