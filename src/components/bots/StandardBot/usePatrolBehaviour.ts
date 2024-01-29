import { useCallback } from "react";
import { useVirtualInput } from "@overreact/engine";
import { useGame } from "../../../hooks";
import { EnemyState } from "../../../state";
import { StateMachine } from "../../../utils";

export const usePatrolBehaviour = () => {
  const game = useGame();
  const input = useVirtualInput();

  const isSolid = useCallback((x: number, y: number) => {
    return game.current.isSolid(x, y);
  }, [game]);
  
  return useCallback((fsm: StateMachine<EnemyState>) => {
    const { direction, block } = fsm.entity;
    const [x, y] = block.current;

    // Change direction if the enemy reached the end of a platform or a wall.
    if (direction.current === 'right') {
      if (!isSolid(x + 1, y) || isSolid(x + 1, y - 1)) {
        direction.current = 'left';
      }
    } else {
      if (!isSolid(x - 1, y) || isSolid(x - 1, y - 1)) {
        direction.current = 'right';
      }
    }

    // Simulate the left or right movements.
    input.simulate(direction.current);
  }, [input, isSolid]);
};
