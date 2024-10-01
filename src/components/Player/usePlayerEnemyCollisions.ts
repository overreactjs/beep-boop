import { useGamepad, useTaggedCollision, useUpdate } from "@overreact/engine";
import { PlayerState } from "../../state";
import { useGame, useGamepadIndex, useSoundEffects } from "../../hooks";

export const usePlayerEnemyCollisions = (collider: string, player: PlayerState) => {
  const game = useGame();
  const sfx = useSoundEffects();
  const gamepad = useGamepad();
  const gamepadIndex = useGamepadIndex(player.player);

  // When the player touches a stunned enemy, do a little jump.
  useTaggedCollision(collider, 'stunned', () => {
    if (player.active.current && player.alive.current) {
      player.velocity.current[1] = Math.min(-0.125, player.velocity.current[1]);
      player.combo.current++;
      sfx.play('PlayerKill');
      gamepad.vibrate(gamepadIndex.current, 100, 0.5);
    }
  });

  // When the player touches a live enemy, kill the player!
  useTaggedCollision(collider, 'enemy', () => {
    if (player.canBeKilled()) {
      player.kill();
      sfx.play('PlayerDeath');
      gamepad.vibrate(gamepadIndex.current, 500, 1.0);
    }
  });

  // When the player touches the glitch, kill the player!
  useUpdate(() => {
    if (player.canBeKilled()) {
      const [bx, by] = player.block.current;
      
      if (game.glitch.check([bx, by - 1])) {
        player.kill();
        sfx.play('PlayerDeath');
        gamepad.vibrate(gamepadIndex.current, 500, 1.0);
      }
    }
  });
};
