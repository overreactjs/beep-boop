import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { UsePlatformMovementResult, useSoundEffects } from "../../../../hooks";
import { SecurityBotState } from "../../../../state";

export const useJumpingState = (movement: UsePlatformMovementResult): StateFunction<SecurityBotState> => {
  const input = useVirtualInput();
  const sfx = useSoundEffects();

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      input.simulate('jump');
      sfx.play('PlayerJump');
      fsm.entity.animation.current = 'run';
    }

    if (movement.isOnFloor) {
      fsm.replace('idle');
    }
  }, [input, movement.isOnFloor, sfx]);
};
