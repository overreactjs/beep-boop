import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { GreenOgreState } from "../../../../state";
import { useGame } from "../../../../hooks";

const COUNT = 7;
const SPREAD = Math.PI / 1.4;

export const useFireState = (): StateFunction<GreenOgreState> => {
  const game = useGame();

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      const angle = (fsm.entity.direction.current === 'right' ? Math.PI / 2 : -Math.PI / 2) - (SPREAD / 2);
      const gap = SPREAD / (COUNT - 1);

      for (let i = 0; i < COUNT; i++) {
        game.fireEnemyFireball(fsm.entity, angle + (i * gap));
      }
    }

    if (fsm.age.current >= 1000) {
      fsm.replace('move');
    }
  }, [game]);
};
