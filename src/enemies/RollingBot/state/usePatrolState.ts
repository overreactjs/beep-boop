import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { UsePlatformMovementResult, useGame } from "../../../hooks";
import { GuardBotState } from "../../../state";

export const usePatrolState = (movement: UsePlatformMovementResult): StateFunction<GuardBotState> => {
  const game = useGame();
  const input = useVirtualInput();
  
  return useCallback((fsm) => {
    const { direction } = fsm.entity;
    const [bx, by] = fsm.entity.block.current;
    const [px, py] = game.current.players[0].block.current;

    const isFacingLeft = direction.current === 'left';
    const isLevelWithPlayer = py === by;
    const canSeePlayer = (px < bx && isFacingLeft) || (px > py && !isFacingLeft);
    const offset = !isFacingLeft ? 1 : -1;

    // Change direction if the enemy reached a wall.
    if (movement.isOnFloor.current && game.current.isSolid(bx + offset, by - 1)) {
      fsm.entity.reverse();
    }

    // Change direction if the enemy reached the end of a platform.
    if (movement.isOnFloor.current && !game.current.isSolid(bx + offset, by)) {
      fsm.entity.reverse();
    }

    // Charge at the player if they are level and can see them.
    if (isLevelWithPlayer && canSeePlayer) {
      // TODO!
    }

    // Simulate the left or right movements.
    input.simulate(direction.current);
    fsm.entity.animation.current = 'rolling';

  }, [game, input, movement]);
};
