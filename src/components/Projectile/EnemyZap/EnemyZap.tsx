import { useUpdate, useTaggedCollision, CollisionBox, Node, BitmapSprite } from "@overreact/engine";
import { useId } from "react";
import { EnemyZapState, PlayerState } from "../../../state";
import { ProjectileProps } from "../types";
import { ZAP_SPRITE } from "./assets";

export const EnemyZap: React.FC<ProjectileProps<EnemyZapState>> = ({ projectile }) => {
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
      if (player?.alive.current && player?.invulnerable.current <= 0) {
        player.alive.current = false;
        projectile.destroy();
      }
    }
  });

  return (
    <Node pos={projectile.pos}>
      <Node offset={[-8, -4]} rounded>
        <BitmapSprite size={[16, 8]} sprite={ZAP_SPRITE} />
      </Node>
      <Node offset={[-4, -4]} rounded>
        <CollisionBox size={[8, 8]} id={collider} tags={['enemyZap']} />
      </Node>
    </Node>
  );
};