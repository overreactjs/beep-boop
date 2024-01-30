import { useCallback } from "react";
import { StateBehaviour } from "../types";

export const useStunnedState = (): StateBehaviour => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'stunned';
  }, []);
};
