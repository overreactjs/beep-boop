import { useCallback } from "react";
import { StateFunction, StateMachine } from "@overreact/engine";
import { UsePlatformMovementResult, useBaseStunnedState } from "../../../../hooks";
import { BaseEnemyState, BounceBotState } from "../../../../state";

export const useStunnedState = (movement: UsePlatformMovementResult): StateFunction<BounceBotState> => {
  const upstream = useBaseStunnedState();

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'stunned';

    if (fsm.age.current > 100 && movement.isOnFloor.current) {
      fsm.entity.velocity.current[0] = 0;
    }

    if (movement.wallToLeft.current || movement.wallToRight.current) {
      fsm.entity.velocity.current[0] = -fsm.entity.velocity.current[0];
      fsm.entity.reverse();
      movement.wallToLeft.current = false;
      movement.wallToRight.current = false;
    }

    upstream(fsm as unknown as StateMachine<BaseEnemyState>, delta);
  }, [movement, upstream]);
};
