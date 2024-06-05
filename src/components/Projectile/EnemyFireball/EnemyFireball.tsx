import { useUpdate, CollisionBox, Node, BitmapSprite, useProperty, useTaggedCollision } from "@overreact/engine";
import { useId } from "react";
import { EnemyFireballState } from "../../../state/ProjectileState";
import { ProjectileProps } from "../types";
import { FIREBALL_SPRITE } from "./assets";
import { PlayerState } from "../../../state";

const DESTROY_AGE = 5000;

export const EnemyFireball: React.FC<ProjectileProps<EnemyFireballState>> = ({ projectile }) => {
  const { pos, velocity } = projectile;
  const collider = useId();
  const age = useProperty(0);

  useUpdate((delta) => {
    pos.current[0] += velocity.current[0] * delta / 16;
    pos.current[1] += velocity.current[1] * delta / 16;
    age.current += delta;

    if (age.current > DESTROY_AGE) {
      projectile.destroy();
    }
  });

  // Kill the player!
  useTaggedCollision<PlayerState>(collider, 'player', (collisions) => {
    for (const { b: { entity: player } } of collisions) {
      if (player?.alive.current && player?.invulnerable.current <= 0) {
        player.alive.current = false;
      }
    }
  });

  return (
    <Node pos={projectile.pos}>
      <Node offset={[-8, -8]} rounded>
        <BitmapSprite size={[16, 16]} sprite={FIREBALL_SPRITE} />
      </Node>
      <Node offset={[-5, -5]}>
        <CollisionBox size={[10, 10]} id={collider} tags={['enemyFireball']} />
      </Node>
    </Node>
  );
};