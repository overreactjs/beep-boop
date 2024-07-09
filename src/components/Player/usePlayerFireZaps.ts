import { useProperty, useUpdate, useVirtualAction } from "@overreact/engine";
import { useGame, useSoundEffects } from "../../hooks";
import { PlayerState } from "../../state";

const FIREBALL_COOLDOWN = 600;
const ZAP_COOLDOWN = 400;
const ZAP_COOLDOWN_FAST = 200;

export const usePlayerFireZaps = (player: PlayerState) => {
  const game = useGame();
  const sfx = useSoundEffects();

  const cooldown = useProperty(0);
  
  useVirtualAction('fire', () => {
    if (cooldown.current === 0 && player.active.current) {
      if (player.hasPowerup('fireballs')) {
        game.firePlayerFireball(player);
        sfx.play('Fireball');
        cooldown.current = FIREBALL_COOLDOWN;
      } else {
        game.firePlayerZap(player);
        sfx.play('PlayerFire');
        cooldown.current = player.hasPowerup('zapSpeed') ? ZAP_COOLDOWN_FAST : ZAP_COOLDOWN;
      }
    }
  });

  // Reduce the cooldown period, until the player is allowed to fire again.
  useUpdate((delta) => {
    cooldown.current = Math.max(0, cooldown.current - delta);
  });
};
