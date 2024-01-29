import { useCallback } from "react";
import { EnemyState } from "../../../state";
import { StateMachine } from "../../../utils";

export const useIdleBehaviour = () => {
  return useCallback((fsm: StateMachine<EnemyState>) => {
    if (fsm.age >= 4000) {
      fsm.push('patrol');
    }
  }, []);
};
