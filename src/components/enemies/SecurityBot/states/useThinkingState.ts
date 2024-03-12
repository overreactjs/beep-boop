import { StateFunction } from "@overreact/engine";
import { useCallback, useRef } from "react";
import { SecurityBotState } from "../../../../state";

const DURATION = 200;

export const useThinkingState = (): StateFunction<SecurityBotState> => {
  const init = useRef(0);

  return useCallback((fsm) => {
    if (fsm.age === 0) {
      init.current = fsm.entity.direction.current === 'left' ? 0 : 1;
      fsm.entity.animation.current = 'idle';

    } else if (fsm.age < DURATION * 5) {
      fsm.entity.direction.current = (Math.floor(fsm.age / DURATION) + init.current) % 2 === 0 ? 'left' : 'right';
      
    } else {
      fsm.entity.direction.current = init.current === 0 ? 'left' : 'right';
      fsm.replace('jumping');      
    }
  }, []);
};
