import { useCallback } from "react";
import { Position, StateFunction } from "@overreact/engine";
import { UseFlyingMovementResult, useGame } from "../../../../hooks";
import { PathfinderBotState } from "../../../../state";

const REGULAR_SPEED = 0.045;
const ANGRY_SPEED = 0.060; 

export const usePatrolState = (movement: UseFlyingMovementResult): StateFunction<PathfinderBotState> => {
  const game = useGame();

  const turn = useCallback((bot: PathfinderBotState, a: Position, b: Position, c: Position, d: Position) => {
    const [x, y] = bot.block.current;
    const ccw = game.isSolid(x + a[0], y + a[1]) || game.isSolid(x + b[0], y + b[1]);
    const cw  = game.isSolid(x + c[0], y + c[1]) || game.isSolid(x + d[0], y + d[1]);

    if (!ccw && !cw) {
      bot.turnRandom();
    } else if (!ccw) {
      bot.turnAntiClockwise();
    } else if (!cw) {
      bot.turnClockwise();
    } else {
      bot.turn180();
    }
  }, [game]);
  
  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      const speed = fsm.entity.angry.current ? ANGRY_SPEED : REGULAR_SPEED;
      const dx = speed * (fsm.entity.direction.current === 'right' ? 1 : -1);
      fsm.entity.velocity.current = [dx, 0];
    }

    if (movement.flags.current.any) {
      const [dx, dy] = fsm.entity.velocity.current;

      if (dx > 0) {
        turn(fsm.entity, [0, -3], [-1, -3], [0, 0], [-1, 0]);
      } else if (dx < 0) {
        turn(fsm.entity, [0, 0], [-1, 0], [0, -3], [-1, -3]);
      } else if (dy > 0) {
        turn(fsm.entity, [1, -2], [1, -1], [-2, -2], [-2, -1]);
      } else if (dy < 0) {
        turn(fsm.entity, [-2, -2], [-2, -1], [1, -2], [1, -1]);
      } 
    }
  }, [movement.flags, turn]);
};
