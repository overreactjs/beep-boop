import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { GreenOgreState } from "../../../../state";

export const useIdleState = (): StateFunction<GreenOgreState> => {
  const cooldown = useProperty(3000);
  const nextTurn = useProperty(800);

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'idle';

    cooldown.current -= delta;
    nextTurn.current -= delta;

    if (nextTurn.current <= 0) {
      nextTurn.current = (Math.random() * 500) + 500;
      fsm.entity.reverse();
    }

    if (cooldown.current <= 0) {
      cooldown.current = (Math.random() * 1000) + 2500;
      fsm.replace('fire');
    }
  }, [cooldown, nextTurn]);
};
