import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { useBaseStunnedState } from "../../../../hooks";
import { SecurityBotState } from "../../../../state";

export const useStunnedState = (): StateFunction<SecurityBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'stunned';

    upstream(fsm, delta);
  }, [upstream]);
};
