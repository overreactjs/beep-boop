import { useId } from "react";
import { useUpdate, CollisionBox, Node, BitmapSprite, useProperty, useTaggedCollision } from "@overreact/engine";
import { PlayerState } from "../../../state";
import { useSoundEffects } from "../../../hooks";
import { EnemyFireballState } from "../../../state/ProjectileState";
import { ProjectileProps } from "../types";
import { FIREBALL_SPRITE } from "./assets";

const DESTROY_AGE = 5000;

export const EnemyFireball: React.FC<ProjectileProps<EnemyFireballState>> = ({ projectile }) => {
  const { pos, velocity } = projectile;

  const sfx = useSoundEffects();
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
      if (player?.canBeKilled()) {
        player.alive.current = false;
        sfx.play('PlayerDeath');
      }
    }
  });

  return (
    <Node pos={projectile.pos}>
      <Node offset={[-8, -8]} rounded>
        <BitmapSprite size={[16, 16]} sprite={FIREBALL_SPRITE} />
      </Node>
      <Node offset={[-4, -4]}>
        <CollisionBox size={[8, 8]} id={collider} tags={['enemyFireball']} />
      </Node>
    </Node>
  );
};