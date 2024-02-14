import { useCallback } from "react";
import { StateFunction, chance } from "@overreact/engine";
import { FlyingBotState } from "../../../state";

export const useIdleState = (): StateFunction<FlyingBotState> => {
  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age > 200 && chance(4 * delta)) {
      fsm.replace('patrol');
    }
  }, []);
};
