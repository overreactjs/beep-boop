import { useTaggedCollision } from "@overreact/engine";
import { PlayerState } from "../../state";

export const usePlayerEnemyCollisions = (collider: string, player: PlayerState) => {
  // When the player touches a stunned enemy, do a little jump.
  useTaggedCollision(collider, 'stunned', () => {
    player.velocity.current[1] = Math.min(-0.125, player.velocity.current[1]);
    player.combo.current++;
  });

  // When the player touches a live enemy, kill the player!
  useTaggedCollision(collider, 'enemy', () => {
    if (player.alive.current && player.invulnerable.current <= 0) {
      player.alive.current = false;
    }
  });
};
