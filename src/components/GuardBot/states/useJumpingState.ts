import { useCallback } from "react";
import { useVirtualInput } from "@overreact/engine";
import { StateFunction } from "../types";

export const useJumpingState = (): StateFunction => {
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
