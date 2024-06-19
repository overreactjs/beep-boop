import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { UsePlatformMovementResult } from "../../../../hooks";
import { SecurityBotState } from "../../../../state";
import { CHANCE_REVERSE_AFTER_FALL } from "../constants";

export const useFallingState = (movement: UsePlatformMovementResult): StateFunction<SecurityBotState> => {
  return useCallback((fsm) => {
    const { animation } = fsm.entity;

    animation.current = 'idle';

    if (movement.isOnFloor.current) {
      if (Math.random() < (CHANCE_REVERSE_AFTER_FALL / 100)) {
        fsm.entity.reverse();
      }

      fsm.replace('patrol');
    }
  }, [movement]);
};
