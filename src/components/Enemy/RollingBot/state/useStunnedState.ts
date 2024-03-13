import { useCallback } from "react";
import { StateFunction, StateMachine, useVirtualInput } from "@overreact/engine";
import { UsePlatformMovementResult, useBaseStunnedState } from "../../../../hooks";
import { EnemyState, RollingBotState } from "../../../../state";

export const useStunnedState = (movement: UsePlatformMovementResult): StateFunction<RollingBotState> => {
  const upstream = useBaseStunnedState();
  const input = useVirtualInput();

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'stunned';

    if (fsm.age.current > 100 && movement.isOnFloor.current) {
      fsm.entity.velocity.current[0] = 0;
    }

    if (!movement.isOnFloor.current) {
      input.simulate(fsm.entity.direction.current);
    }

    upstream(fsm as StateMachine<EnemyState>, delta);
  }, [input, movement.isOnFloor, upstream]);
};
