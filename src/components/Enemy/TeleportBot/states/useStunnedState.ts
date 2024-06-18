import { StateFunction, StateMachine } from "@overreact/engine";
import { useCallback } from "react";
import { BaseEnemyState, TeleportBotState } from "../../../../state";
import { useBaseStunnedState } from "../../../../hooks";

export const useStunnedState = (): StateFunction<TeleportBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'stunned';
    
    upstream(fsm as unknown as StateMachine<BaseEnemyState>, delta);
  }, [upstream]);
};
