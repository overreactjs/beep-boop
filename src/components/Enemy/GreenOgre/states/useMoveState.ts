import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { GreenOgreState } from "../../../../state";
import { useGame } from "../../../../hooks";

export const useMoveState = (): StateFunction<GreenOgreState> => {
  const game = useGame();
  const input = useVirtualInput();

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      const y = fsm.entity.pos.current[1] - ((game.level.current - 1) * 200);

      if (y < 50) {
        input.simulate('fall');
      } else if (y > 190) {
        input.simulate('jump');
      } else {
        input.simulate(Math.random() >= 0.5 ? 'jump' : 'fall');
      }
    }

    if (fsm.age.current >= 500) {
      fsm.replace('idle');
    }
  }, [game.level, input]);
};
