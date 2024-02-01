import { useCallback } from "react";
import { StateFunction } from "../types";

export const useStunnedState = (): StateFunction => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'stunned';
  }, []);
};
