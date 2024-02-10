import { useCallback } from "react";
import { useVirtualInput } from "@overreact/engine";
import { StateFunction } from "../types";

export const useJumpingState = (): StateFunction => {
  const input = useVirtualInput();

  return useCallback((fsm) => {
    if (fsm.age === 0) {
      fsm.entity.velocity.current[0] = 0.04 * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.animation.current = 'jumping';
      input.simulate('jump');
    }

    if (fsm.age > 50 && fsm.entity.movement?.isOnFloor.current) {
      fsm.replace('idle');
      fsm.entity.velocity.current[0] = 0;
    }

    if (fsm.entity.movement?.wallToLeft.current || fsm.entity.movement?.wallToRight.current) {
      fsm.entity.velocity.current[0] = -fsm.entity.velocity.current[0] * 0.75;
      fsm.entity.reverse();
      fsm.entity.movement.wallToLeft.current = false;
      fsm.entity.movement.wallToRight.current = false;
    }
  }, [input]);
};
