import { useCallback } from "react";
import { StateFunction } from "../types";

export const useStunnedState = (): StateFunction => {
  return useCallback((fsm) => {
    fsm.entity.velocity.current = [0, 0];
    fsm.entity.animation.current = 'stunned';

    if (fsm.age > 10000) {
      fsm.replace('idle');
    }
  }, []);
};
