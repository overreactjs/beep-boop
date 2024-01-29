import { useCallback } from "react";
import { StateMachine } from "./types";

export const useFallingBehaviour = () => {
  return useCallback((fsm: StateMachine) => {
    const { movement } = fsm.entity;

    // Change direction after falling.
    if (movement?.isOnFloor.current) {
      fsm.replace('patrol');
      fsm.entity.reverse();
    }
  }, []);
};
