import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { RollingBotState } from "../../../state";

export const useIdleState = (): StateFunction<RollingBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age > 200) {
      fsm.replace('patrol');
    }
  }, []);
};
