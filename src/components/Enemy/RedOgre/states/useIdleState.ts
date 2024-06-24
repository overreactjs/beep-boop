import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { RedOgreState } from "../../../../state";

export const useIdleState = (): StateFunction<RedOgreState> => {
  const cooldown = useProperty(2500);

  return useCallback((fsm, delta) => {
    fsm.entity.animation.current = 'idle';

    cooldown.current -= delta;

    if (cooldown.current <= 0) {
      cooldown.current = (Math.random() * 1400) + 200;
      fsm.replace('fire');
    }
  }, [cooldown]);
};
