import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { FlyingBotState } from "../../../state";

export const useStunnedState = (): StateFunction<FlyingBotState> => {
  return useCallback((fsm) => {
    fsm.entity.velocity.current = [0, 0];
    fsm.entity.animation.current = 'stunned';

    if (fsm.age > 10000) {
      fsm.replace('idle');
    }
  }, []);
};
