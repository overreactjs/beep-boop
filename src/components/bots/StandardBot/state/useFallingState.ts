import { useCallback } from "react";
import { StateBehaviour } from "../types";

export const useFallingState = (): StateBehaviour => {
  return useCallback((fsm) => {
    const { movement } = fsm.entity;

    fsm.entity.animation.current = 'idle';

    if (movement?.isOnFloor.current) {
      fsm.replace('patrol');
    }
  }, []);
};
