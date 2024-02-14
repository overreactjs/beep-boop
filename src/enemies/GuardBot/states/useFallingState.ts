import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UsePlatformMovementResult } from "../../../hooks";
import { GuardBotState } from "../../../state";

export const useFallingState = (movement: UsePlatformMovementResult): StateFunction<GuardBotState> => {
  return useCallback((fsm) => {
    const { animation } = fsm.entity;

    animation.current = 'idle';

    if (movement.isOnFloor.current) {
      if (Math.random() < 0.15) {
        fsm.entity.reverse();
      }

      fsm.replace('patrol');
    }
  }, [movement]);
};
