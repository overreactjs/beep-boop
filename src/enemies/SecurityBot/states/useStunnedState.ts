import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { SecurityBotState } from "../../../state";

export const useStunnedState = (): StateFunction<SecurityBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'stunned';
  }, []);
};
