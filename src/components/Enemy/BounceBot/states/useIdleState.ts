import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { BounceBotState } from "../../../../state";

export const useIdleState = (): StateFunction<BounceBotState> => {
  const cooldown = useProperty(300);

  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age.current > cooldown.current) {
      fsm.replace('jumping');
      cooldown.current = fsm.entity.angry.current ? 0 : 200 + Math.random() * 300;
    }
  }, [cooldown]);
};
