import { useCallback } from "react";
import { StateBehaviour } from "../types";

export const useIdleState = (): StateBehaviour => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';
    fsm.replace('patrol');
  }, []);
};
