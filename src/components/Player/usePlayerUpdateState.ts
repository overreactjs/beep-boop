import { usePostCollisions } from "@overreact/engine";
import { UsePlatformMovementResult } from "../../hooks";
import { PlayerState } from "../../state";

export const usePlayerUpdateState = (player: PlayerState, movement: UsePlatformMovementResult) => {
  usePostCollisions(() => {
    player.flip.current = movement?.facing.current === 'left';
    player.animation.current = Math.round(player.velocity.current[0] * 100) / 100 !== 0 ? 'run' : 'idle';

    if (movement?.isOnFloor && player.velocity.current[1] === 0) {
      player.combo.current = -1;
    }
  });
};
