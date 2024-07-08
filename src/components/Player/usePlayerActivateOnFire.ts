import { useVirtualAction } from "@overreact/engine";
import { PlayerState } from "../../state";
import { useSoundEffects } from "../../hooks";

export const usePlayerActivateOnFire = (player: PlayerState) => {
  const sfx = useSoundEffects();

  useVirtualAction('fire', () => {
    if (!player.active.current) {
      player.active.current = true;
      sfx.play('MenuSelect');
    }
  });
};
