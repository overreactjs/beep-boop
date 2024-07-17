import { useProperty, useUpdate, useVirtualInput } from "@overreact/engine";
import { useGame, useSettings, useSoundEffects } from "../../hooks";
import { PlayerState } from "../../state";

const FIREBALL_COOLDOWN = 600;
const ZAP_COOLDOWN = 400;
const ZAP_COOLDOWN_FAST = 200;

export const usePlayerFireZaps = (player: PlayerState) => {
  const { firingMode } = useSettings();

  const game = useGame();
  const sfx = useSoundEffects();
  const input = useVirtualInput();

  const released = useProperty(true);
  const cooldown = useProperty(0);

  useUpdate((delta) => {
    // The fire button is held down, or the user has auto mode enabled.
    if (input.isActive('fire') || firingMode.current === 'automatic') {
      if (released.current && cooldown.current === 0 && player.active.current) {
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

      // We only care about the button being released in manual mode.
      if (firingMode.current === 'manual') {
        released.current = false;
      }
    }
    
    // Reset the released state, so the user can fire again.
    if (!input.isActive('fire')) {
      released.current = true;
    }

    // Reduce the cooldown period, until the player is allowed to fire again.
    cooldown.current = Math.max(0, cooldown.current - delta);
  });
};
