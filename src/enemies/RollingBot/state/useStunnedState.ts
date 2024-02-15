import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { RollingBotState } from "../../../state";

export const useStunnedState = (): StateFunction<RollingBotState> => {
  return useCallback((fsm) => {
    fsm.replace('idle');
  }, []);
};
