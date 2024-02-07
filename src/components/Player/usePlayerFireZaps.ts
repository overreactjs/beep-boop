import { useProperty, useUpdate, useVirtualAction } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PlayerState } from "../../state";

export const usePlayerFireZaps = (player: PlayerState) => {
  const game = useGame();
  const cooldown = useProperty(0);
  
  useVirtualAction('fire', () => {
    if (cooldown.current === 0) {
      game.current.fireZap(player);
      cooldown.current = 250;
    }
  });

  // Reduce the cooldown period, until the player is allowed to fire again.
  useUpdate((delta) => {
    cooldown.current = Math.max(0, cooldown.current - delta);
  });
};
