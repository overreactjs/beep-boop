import { useCallback } from "react";
import { StateFunction } from "../types";

export const useFallingState = (): StateFunction => {
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
