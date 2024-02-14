import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UsePlatformMovementResult } from "../../../hooks";
import { BounceBotState } from "../../../state";

export const useStunnedState = (movement: UsePlatformMovementResult): StateFunction<BounceBotState> => {
  return useCallback((fsm) => {
    fsm.entity.animation.current = 'stunned';

    if (fsm.age > 100 && movement.isOnFloor.current) {
      fsm.entity.velocity.current[0] = 0;
    }

    if (movement.wallToLeft.current || movement.wallToRight.current) {
      fsm.entity.velocity.current[0] = -fsm.entity.velocity.current[0];
      fsm.entity.reverse();
      movement.wallToLeft.current = false;
      movement.wallToRight.current = false;
    }
  }, [movement]);
};
