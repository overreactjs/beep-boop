import { useCallback } from "react";
import { StateBehaviour } from "../types";

export const useFallingState = (): StateBehaviour => {
  return useCallback((fsm) => {
    const { animation, movement } = fsm.entity;

    animation.current = 'idle';

    if (movement?.isOnFloor.current) {
      if (Math.random() < 0.25) {
        fsm.entity.reverse();
      }

      fsm.replace('patrol');
    }
  }, []);
};
