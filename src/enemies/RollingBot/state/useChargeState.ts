import { useCallback } from "react";
import { StateFunction, useVirtualInput } from "@overreact/engine";
import { RollingBotState } from "../../../state";
import { UsePlatformMovementResult, useGame } from "../../../hooks";

export const useChargeState = (movement: UsePlatformMovementResult): StateFunction<RollingBotState> => {
  const game = useGame();
  const input = useVirtualInput();
  
  return useCallback((fsm) => {
    const { direction } = fsm.entity;
    const [bx, by] = fsm.entity.block.current;
    const [px, py] = game.players[0].block.current;

    fsm.entity.charge();

    const isFacingLeft = direction.current === 'left';
    const isLevelWithPlayer = by >= py - 1 && by <= py + 1;
    const canSeePlayer = (px < bx && isFacingLeft) || (px > py && !isFacingLeft);
    const offset = !isFacingLeft ? 1 : -1;

    // Change direction if the enemy reached a wall.
    if (movement.isOnFloor.current && game.isSolid(bx + offset, by - 1)) {
      fsm.entity.reverse();
    }

    // Change direction if the enemy reached the end of a platform.
    if (movement.isOnFloor.current && !game.isSolid(bx + offset, by)) {
      if (isLevelWithPlayer && canSeePlayer) {
        fsm.replace('jump');
      } else {
        fsm.replace('survey');
      }
    }

    // Simulate the left or right movements.
    input.simulate(direction.current);
    fsm.entity.animation.current = 'rolling';

  }, [game, input, movement]);
};
