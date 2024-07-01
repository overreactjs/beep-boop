import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { SecurityBotState } from "../../../../state";
import { IDLE_DURATION } from "../constants";

export const useIdleState = (): StateFunction<SecurityBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age.current > IDLE_DURATION) {
      fsm.replace('patrol');
    }
  }, []);
};
