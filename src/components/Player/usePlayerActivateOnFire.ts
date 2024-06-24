import { useVirtualAction } from "@overreact/engine";
import { PlayerState } from "../../state";

export const usePlayerActivateOnFire = (player: PlayerState) => {
  useVirtualAction('fire', () => {
    if (!player.active.current) {
      player.active.current = true;
    }
  });
};
