import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { RollingBotState } from "../../../../state";
import { UsePlatformMovementResult, useSoundEffects } from "../../../../hooks";

export const useJumpingState = (movement: UsePlatformMovementResult): StateFunction<RollingBotState> => {
  const input = useVirtualInput();
  const sfx = useSoundEffects();

  return useCallback((fsm) => {
    input.simulate('jump');
    input.simulate(fsm.entity.direction.current);
    sfx.play('PlayerJump');

    if (movement.isOnFloor) {
      fsm.replace('patrol');
    }
  }, [input, movement.isOnFloor, sfx]);
};
