import { useCallback } from "react";
import { StateBehaviour } from "../types";
import { useGame } from "../../../../hooks";
import { PointsValue } from "../../../../types";

export const useDeadState = (): StateBehaviour => {
  const game = useGame();
  
  return useCallback((fsm, delta) => {
    if (fsm.age === 0) {
      const player = game.current.players[0];
      const [px] = player.pos.current;
      const [ex] = fsm.entity.pos.current;
      fsm.entity.velocity.current[0] = px <= ex ? 1 : -1;

      const value = (Math.pow(2, Math.min(3, player.combo.current)) * 1000) as PointsValue;
      player.addPoints(value);
      game.current.showPoints([...fsm.entity.pos.current], value);
    }

    fsm.entity.velocity.current[0] = Math.sign(fsm.entity.velocity.current[0]) * 0.1;
    fsm.entity.scale.current += 0.002 * delta;
    fsm.entity.angle.current += 0.1 * delta;

    if (fsm.age >= 750) {
      game.current.killEnemy(fsm.entity);
      game.current.createRandomItem();
      fsm.replace('gone');
    }
  }, [game]);
};
