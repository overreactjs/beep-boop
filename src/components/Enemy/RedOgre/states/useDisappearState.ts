import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { RedOgreState } from "../../../../state";

export const useDisappearState = (): StateFunction<RedOgreState> => {
  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      fsm.entity.animation.current = 'teleport';
      fsm.entity.invulnerable.current = 2000;
    }

    if (fsm.age.current >= 2000) {
      fsm.replace('appear');
    }
  }, []);
};
