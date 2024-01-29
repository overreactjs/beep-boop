import { useCallback } from "react";
import { useVirtualInput } from "@overreact/engine";
import { StateBehaviour } from "../types";

export const useJumpingState = (): StateBehaviour => {
  const input = useVirtualInput();

  return useCallback((fsm) => {
    if (fsm.age === 0) {
      input.simulate('jump');
      fsm.entity.animation.current = 'run';
    }

    if (fsm.entity.movement?.isOnFloor) {
      fsm.replace('idle');
    }
  }, [input]);
};
