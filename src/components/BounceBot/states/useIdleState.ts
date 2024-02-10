import { useCallback } from "react";
import { StateFunction } from "../types";
import { useProperty } from "@overreact/engine";

export const useIdleState = (): StateFunction => {
  const cooldown = useProperty(300);

  return useCallback((fsm) => {
    fsm.entity.animation.current = 'idle';

    if (fsm.age > cooldown.current) {
      fsm.replace('jumping');
      cooldown.current = 200 + Math.random() * 300;
    }
  }, [cooldown]);
};
