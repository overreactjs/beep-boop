import { useCallback } from "react";
import { StateFunction, StateMachine } from "@overreact/engine";
import { useBaseStunnedState } from "../../../../hooks";
import { BaseEnemyState, SecurityBotState } from "../../../../state";

export const useStunnedState = (): StateFunction<SecurityBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'stunned';

    upstream(fsm as unknown as StateMachine<BaseEnemyState>, delta);
  }, [upstream]);
};
