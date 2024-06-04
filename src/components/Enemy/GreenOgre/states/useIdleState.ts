import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { GreenOgreState } from "../../../../state";

export const useIdleState = (): StateFunction<GreenOgreState> => {
  const cooldown = useProperty(2500);
  const nextTurn = useProperty(1000);

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'idle';

    cooldown.current -= delta;
    nextTurn.current -= delta;

    if (nextTurn.current <= 0) {
      nextTurn.current = (Math.random() * 400) + 200;
      fsm.entity.reverse();
    }

    if (cooldown.current <= 0) {
      cooldown.current = (Math.random() * 1400) + 200;
      fsm.replace('fire');
    }
  }, [cooldown, nextTurn]);
};
