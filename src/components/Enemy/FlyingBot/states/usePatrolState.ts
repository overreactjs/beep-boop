import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UseFlyingMovementResult } from "../../../../hooks";
import { FlyingBotState } from "../../../../state";

const REGULAR_VELOCITY = [0.025, 0.015];
const ANGRY_VELOCITY = [0.035, 0.021];

export const usePatrolState = (movement: UseFlyingMovementResult): StateFunction<FlyingBotState> => {
  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      const v = fsm.entity.angry.current ? ANGRY_VELOCITY : REGULAR_VELOCITY;
      const dx = v[0] * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.velocity.current = [dx, v[1]];
    }

    if (movement.flags.current.horizontal) {
      fsm.entity.reverse();
    }

    if (movement.flags.current.vertical) {
      fsm.entity.velocity.current[1] = -fsm.entity.velocity.current[1];
    }
  }, [movement]);
};


