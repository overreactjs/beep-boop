import { useCallback } from "react";
import { StateMachine } from "./types";

export const useIdleBehaviour = () => {
  return useCallback((fsm: StateMachine) => {
    fsm.push('patrol');
  }, []);
};
