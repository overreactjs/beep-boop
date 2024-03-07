import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { RollingBotState } from "../../../state";

export const useSurveyState = (): StateFunction<RollingBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age >= 1200) {
      fsm.entity.reverse();
      fsm.replace('idle');
    }
  }, []);
};
