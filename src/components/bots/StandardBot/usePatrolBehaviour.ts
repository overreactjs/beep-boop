import { useCallback } from "react";
import { useVirtualInput } from "@overreact/engine";
import { useGame } from "../../../hooks";
import { StateMachine } from "./types";

export const usePatrolBehaviour = () => {
  const game = useGame();
  const input = useVirtualInput();
  
  return useCallback((fsm: StateMachine) => {
    const { direction, block, movement } = fsm.entity;
    const [bx, by] = block.current;

    // Change direction if the enemy reached the end of a platform or a wall.
    const offset = direction.current === 'right' ? 1 : -1;
    if (game.current.isSolid(bx + offset, by - 1)) {
      fsm.entity.reverse();
    }

    // Change direction after falling.
    if (movement?.isFalling.current) {
      fsm.replace('falling');
    }

    // Simulate the left or right movements.
    input.simulate(direction.current);
  }, [game, input]);
};
