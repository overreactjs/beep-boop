import { useTaggedCollision } from "@overreact/engine";
import { useGame, useSoundEffects } from "../../hooks";
import { PlayerState, ItemState } from "../../state";
import { ItemType } from "../../types";
import { useCallback } from "react";

const POWERUPS: ItemType[] = [
  'potion_blue',
  'potion_magenta',
  'hot_sauce',
  'circuit_1r',
  'circuit_2o',
  'circuit_3b',
  'circuit_4o',
  'circuit_5t',
];

export const usePlayerCollectItems = (collider: string, player: PlayerState) => {
  const game = useGame();
  const sfx = useSoundEffects();

  const playSoundEffect = useCallback((type: ItemType) => {
    if (type === 'dynamite') {
      sfx.play('Explosion');
    } else if (POWERUPS.includes(type)) {
      sfx.play('Powerup');
    } else {
      sfx.play('PlayerCollect');
    }
  }, [sfx]);

  useTaggedCollision<ItemState>(collider, 'item', (collisions) => {
    if (player.active.current) {
      collisions.forEach(({ b }) => {
        if (b.entity) {
          game.collectItem(player, b.entity);
          playSoundEffect(b.entity.type);
        }
      });
    }
  });
};
