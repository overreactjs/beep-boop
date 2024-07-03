import { useTaggedCollision } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PlayerState, ItemState } from "../../state";

export const usePlayerCollectItems = (collider: string, player: PlayerState) => {
  const game = useGame();

  useTaggedCollision<ItemState>(collider, 'item', (collisions) => {
    if (player.active.current) {
      collisions.forEach(({ b }) => {
        if (b.entity) {
          game.collectItem(player, b.entity);
        }
      });
    }
  });
};
