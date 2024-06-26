import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UsePlatformMovementResult } from "../../../../hooks";
import { TeleportBotState } from "../../../../state";

export const useFallingState = (movement: UsePlatformMovementResult): StateFunction<TeleportBotState> => {
  return useCallback((fsm) => {
    const { animation } = fsm.entity;

    animation.current = 'idle';

    if (movement.isOnFloor.current) {
      if (Math.random() < 0.33) {
        fsm.entity.reverse();
      }

      fsm.replace('patrol');
    }
  }, [movement]);
};
