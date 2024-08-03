import { useCallback, useId } from "react";
import { useUpdate, CollisionBox, Node, BitmapSprite, useProperty, useTaggedCollision, useParticles, useFixedUpdate } from "@overreact/engine";
import { PlayerRainbowState } from "../../../state";
import { ProjectileProps } from "../types";
import { RAINBOW_SPRITE } from "./assets";
import { RainbowParticle } from "./RainbowParticle";

const PARTICLE_COUNT = 50;
const DESTROY_AGE = 5000;

export const PlayerRainbow: React.FC<ProjectileProps<PlayerRainbowState>> = ({ projectile }) => {
  const particles = useParticles();
  
  const collider = useId();
  const wallCollider = useId();

  const age = useProperty(0);

  /**
   * Create a whole batch of particles when the rainbow hits a wall.
   */
  const createCollisionParticles = useCallback(() => {
    for (let i = 0; i <= PARTICLE_COUNT; i++) {
      particles.attach(RainbowParticle.fromRainbowCollision(projectile));
    }
  }, [particles, projectile]);

  /**
   * Move the rainbow zap, and check to see if it should be destroyed.
   */
  useUpdate((delta) => {
    projectile.pos.current[0] += delta / 8 * projectile.direction;
    age.current += delta;

    if (age.current > DESTROY_AGE) {
      projectile.destroy();
    }
  });

  /**
   * Leave a trail of particles behind the rainbow zap when in flight.
   */
  useFixedUpdate(60, () => {
    particles.attach(RainbowParticle.fromRainbowTravel(projectile));
  });

  /**
   * Destroy projectiles when they hit walls, but only walls that have left/right collisions
   * enabled.
   */
  useTaggedCollision(wallCollider, 'platform', (collisions) => {
    if (projectile.direction === 1 && collisions.some(({ tags }) => tags.includes('left'))) {
      projectile.destroy();
      createCollisionParticles();

    } else if (projectile.direction === -1 && collisions.some(({ tags }) => tags.includes('right'))) {
      projectile.destroy();
      createCollisionParticles();
    }
  });

  return (
    <Node pos={projectile.pos}>
      <Node offset={[-4, -4]} rounded>
        <BitmapSprite size={[8, 8]} sprite={RAINBOW_SPRITE} />
      </Node>
      <Node offset={[-4, -4]}>
        <CollisionBox size={[8, 8]} id={collider} tags={['playerRainbow']}/>
      </Node>
      <Node offset={[-2, -2]}>
        <CollisionBox size={[4, 4]} id={wallCollider}/>
      </Node>
    </Node>
  );
};