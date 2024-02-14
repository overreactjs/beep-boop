import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { GuardBotState } from "../../../state";

export const useStunnedState = (): StateFunction<GuardBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'stunned';
  }, []);
};
