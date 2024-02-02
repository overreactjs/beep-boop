import { useCallback } from "react";
import { StateFunction } from "../types";

export const useIdleState = (): StateFunction => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age > 200) {
      fsm.replace('patrol');
    }
  }, []);
};
