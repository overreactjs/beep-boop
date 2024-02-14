import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { UseBubbleBobbleMovementResult } from "../../../hooks";
import { BounceBotState } from "../../../state";

export const useJumpingState = (movement: UseBubbleBobbleMovementResult): StateFunction<BounceBotState> => {
  const input = useVirtualInput();

  return useCallback((fsm) => {
    if (fsm.age === 0) {
      fsm.entity.velocity.current[0] = 0.04 * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.animation.current = 'jumping';
      input.simulate('jump');
    }

    if (fsm.age > 50 && movement.isOnFloor.current) {
      fsm.replace('idle');
      fsm.entity.velocity.current[0] = 0;
    }

    if (movement.wallToLeft.current || movement.wallToRight.current) {
      fsm.entity.velocity.current[0] = -fsm.entity.velocity.current[0] * 0.75;
      fsm.entity.reverse();
      movement.wallToLeft.current = false;
      movement.wallToRight.current = false;
    }
  }, [input, movement]);
};
