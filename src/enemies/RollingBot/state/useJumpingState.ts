import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { RollingBotState } from "../../../state";
import { UsePlatformMovementResult } from "../../../hooks";

export const useJumpingState = (movement: UsePlatformMovementResult): StateFunction<RollingBotState> => {
  const input = useVirtualInput();

  return useCallback((fsm) => {
    input.simulate('jump');
    input.simulate(fsm.entity.direction.current);

    if (movement.isOnFloor) {
      fsm.replace('patrol');
    }
  }, [input, movement]);
};
