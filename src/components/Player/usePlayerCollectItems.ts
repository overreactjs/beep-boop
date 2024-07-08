import { useTaggedCollision } from "@overreact/engine";
import { useGame, useSoundEffects } from "../../hooks";
import { PlayerState, ItemState } from "../../state";

export const usePlayerCollectItems = (collider: string, player: PlayerState) => {
  const game = useGame();
  const sfx = useSoundEffects();

  useTaggedCollision<ItemState>(collider, 'item', (collisions) => {
    if (player.active.current) {
      let hasCollected = false;

      collisions.forEach(({ b }) => {
        if (b.entity) {
          game.collectItem(player, b.entity);
          hasCollected = true;
        }
      });

      if (hasCollected) {
        sfx.play('PlayerCollect');
      }
    }
  });
};
