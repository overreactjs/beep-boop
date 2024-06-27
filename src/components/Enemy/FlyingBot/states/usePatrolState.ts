import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { UseFlyingMovementResult } from "../../../../hooks";
import { FlyingBotState } from "../../../../state";

const REGULAR_VELOCITY = [0.025, 0.015];
const ANGRY_VELOCITY = [0.035, 0.021];

export const usePatrolState = (movement: UseFlyingMovementResult): StateFunction<FlyingBotState> => {
  const angry = useProperty(false);
  
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

    // Update the speed of the bot if they have become angry, but were not previously.
    if (!angry.current && fsm.entity.angry.current) {
      fsm.entity.velocity.current[0] = Math.sign(fsm.entity.velocity.current[0]) * ANGRY_VELOCITY[0];
      fsm.entity.velocity.current[1] = Math.sign(fsm.entity.velocity.current[1]) * ANGRY_VELOCITY[1];
      angry.current = true;
    }
  }, [angry, movement]);
};


