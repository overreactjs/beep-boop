import { useTaggedCollision } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PlayerState } from "../../state";

export const usePlayerTeleport = (collider: string, player: PlayerState) => {
  const game = useGame();
  
  useTaggedCollision(collider, 'portal', () => {
    game.teleport(player);
  });
};
