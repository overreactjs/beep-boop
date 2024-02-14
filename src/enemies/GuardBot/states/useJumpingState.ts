import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { UseBubbleBobbleMovementResult } from "../../../hooks";
import { GuardBotState } from "../../../state";

export const useJumpingState = (movement: UseBubbleBobbleMovementResult): StateFunction<GuardBotState> => {
  const input = useVirtualInput();

  return useCallback((fsm) => {
    if (fsm.age === 0) {
      input.simulate('jump');
      fsm.entity.animation.current = 'run';
    }

    if (movement.isOnFloor) {
      fsm.replace('idle');
    }
  }, [input, movement]);
};
