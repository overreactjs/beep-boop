import { useProperty, useUpdate, useVirtualAction } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PlayerState } from "../../state";

const FIREBALL_COOLDOWN = 600;
const ZAP_COOLDOWN = 400;
const ZAP_COOLDOWN_FAST = 200;

export const usePlayerFireZaps = (player: PlayerState) => {
  const game = useGame();
  const cooldown = useProperty(0);
  
  useVirtualAction('fire', () => {
    if (cooldown.current === 0) {
      if (player.hasPowerup('fireballs')) {
        game.firePlayerFireball(player);
        cooldown.current = FIREBALL_COOLDOWN;
      } else {
        game.firePlayerZap(player);
        cooldown.current = player.hasPowerup('zapSpeed') ? ZAP_COOLDOWN_FAST : ZAP_COOLDOWN;
      }
    }
  });

  // Reduce the cooldown period, until the player is allowed to fire again.
  useUpdate((delta) => {
    cooldown.current = Math.max(0, cooldown.current - delta);
  });
};
