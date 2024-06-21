import { usePostCollisions } from "@overreact/engine";
import { UsePlatformMovementResult } from "../../hooks";
import { PlayerState } from "../../state";

export const usePlayerUpdateState = (player: PlayerState, movement: UsePlatformMovementResult) => {
  usePostCollisions(() => {
    if (movement?.facing.current !== null) {
      player.flip.current = movement?.facing.current === 'left';
    }

    if (movement.isJumping.current) {
      player.animation.current = 'jump';
    } else if (movement.isFalling.current) {
      player.animation.current = 'fall';
    } else if (Math.round(player.velocity.current[0] * 100) / 100 === 0) {
      player.animation.current = 'idle';
    } else {
      player.animation.current = 'run';
    }

    if (movement?.isOnFloor && player.velocity.current[1] === 0) {
      player.combo.current = -1;
    }
  });
};
