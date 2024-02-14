import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { SecurityBotState } from "../../../state";

export const useIdleState = (): StateFunction<SecurityBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age > 200) {
      fsm.replace('patrol');
    }
  }, []);
};
