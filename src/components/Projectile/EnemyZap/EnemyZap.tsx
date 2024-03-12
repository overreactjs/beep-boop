import { useOffsetPosition, useUpdate, useTaggedCollision, CollisionBox, Node, BitmapSprite } from "@overreact/engine";
import { useId } from "react";
import { EnemyZapState, PlayerState } from "../../../state";
import { ProjectileProps } from "../types";
import { ZAP_SPRITE } from "./assets";

export const EnemyZap: React.FC<ProjectileProps<EnemyZapState>> = ({ projectile }) => {
  const spritePos = useOffsetPosition(projectile.pos, [-8, -4]);
  const colliderPos = useOffsetPosition(projectile.pos, [-4, -4]);
  const collider = useId();

  useUpdate((delta) => {
    projectile.pos.current[0] += delta / 20 * projectile.direction;
  });

  useTaggedCollision(collider, 'solid', () => {
    projectile.destroy();
  });

  // Kill the player and destroy the zap!
  useTaggedCollision<PlayerState>(collider, 'player', (collisions) => {
    for (const { b: { entity: player } } of collisions) {
      if (player?.alive.current) {
        player.alive.current = false;
        projectile.destroy();
      }
    }
  });

  return (
    <Node>
      <BitmapSprite pos={spritePos} size={[16, 8]} sprite={ZAP_SPRITE} />
      <CollisionBox pos={colliderPos} size={[8, 8]} id={collider} tags={['enemyZap']} />
    </Node>
  );
};