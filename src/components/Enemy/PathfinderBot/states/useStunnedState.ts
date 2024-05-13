import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { useBaseStunnedState } from "../../../../hooks";
import { PathfinderBotState } from "../../../../state";

export const useStunnedState = (): StateFunction<PathfinderBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.velocity.current = [0, 0];
    fsm.entity.animation.current = 'stunned';

    upstream(fsm, delta);
  }, [upstream]);
};
