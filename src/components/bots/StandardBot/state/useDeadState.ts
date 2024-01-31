import { useCallback } from "react";
import { StateBehaviour } from "../types";
import { useGame } from "../../../../hooks";

export const useDeadState = (): StateBehaviour => {
  const game = useGame();
  
  return useCallback((fsm, delta) => {
    if (fsm.age === 0) {
      game.current.killEnemy(fsm.entity);
    }

    fsm.entity.velocity.current[0] = Math.sign(fsm.entity.velocity.current[0]) * 0.1;
    fsm.entity.scale.current += 0.002 * delta;
    fsm.entity.angle.current += 0.1 * delta;

    if (fsm.age >= 750) {
      game.current.destroyEnemy(fsm.entity);
      fsm.replace('gone');
    }
  }, [game]);
};
