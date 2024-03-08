import { useCallback } from "react";
import { StateFunction, chance, useVirtualInput } from "@overreact/engine";
import { UsePlatformMovementResult, useGame } from "../../../hooks";
import { SecurityBotState } from "../../../state";

const JUMP_CHANCE = 2.0;

export const usePatrolState = (movement: UsePlatformMovementResult): StateFunction<SecurityBotState> => {
  const game = useGame();
  const input = useVirtualInput();
  
  return useCallback((fsm, delta) => {
    const { direction, block } = fsm.entity;
    const [bx, by] = block.current;

    fsm.entity.animation.current = 'run';

    // Change direction if the enemy reached the end of a platform or a wall.
    const offset = direction.current === 'right' ? 1 : -1;
    if (movement.isOnFloor.current && game.isSolid(bx + offset, by - 1)) {
      fsm.entity.reverse();
    }

    // When the enemy walks off the edge of a platform.
    if (movement.isFalling.current) {
      return fsm.replace('falling');
    }

    // Jump if the player is above the enemy, and there's a platform to jump on to.
    const isBelowPlayer = game.players[0].block.current[1] <= by;
    const isBelowPlatform = game.isSolid(bx, by - 4);
    if (isBelowPlayer && isBelowPlatform && chance(JUMP_CHANCE * delta)) {
      return fsm.replace('thinking');
    }

    // Simulate the left or right movements.
    input.simulate(direction.current);
  }, [game, input, movement]);
};
