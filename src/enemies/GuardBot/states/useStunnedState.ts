import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { GuardBotState } from "../../../state";
import { useBaseStunnedState } from "../../../hooks";

export const useStunnedState = (): StateFunction<GuardBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'stunned';
    
    upstream(fsm, delta);
  }, [upstream]);
};
