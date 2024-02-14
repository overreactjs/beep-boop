import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { FlyingBotState } from "../../../state";

export const useIdleState = (): StateFunction<FlyingBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age > 200) {
      fsm.replace('patrol');
    }
  }, []);
};
