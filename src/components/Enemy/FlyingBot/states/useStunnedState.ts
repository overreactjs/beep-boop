import { StateFunction, StateMachine } from "@overreact/engine";
import { useCallback } from "react";
import { useBaseStunnedState } from "../../../../hooks";
import { BaseEnemyState, FlyingBotState } from "../../../../state";

export const useStunnedState = (): StateFunction<FlyingBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.velocity.current = [0, 0];
    fsm.entity.animation.current = 'stunned';

    upstream(fsm as unknown as StateMachine<BaseEnemyState>, delta);
  }, [upstream]);
};
