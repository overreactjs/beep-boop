import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { BaseEnemyState } from "../state";
import { useGame } from "./useGame";

export function useBaseDeadState<T extends BaseEnemyState>(): StateFunction<T> {
  const game = useGame();
  const threshold = game.level.current * 200 + 16;
  
  return useCallback((fsm, delta) => {
    if (fsm.age.current === 0) {
      game.killEnemy(fsm.entity);
    }

    fsm.entity.velocity.current[0] = Math.sign(fsm.entity.velocity.current[0]) * 0.1;
    fsm.entity.scale.current += 0.002 * delta;
    fsm.entity.angle.current += 0.1 * delta;

    if (fsm.age.current >= 750 || fsm.entity.pos.current[1] >= threshold) {
      game.destroyEnemy(fsm.entity);
      fsm.replace('gone');
    }
  }, [game, threshold]);
}
