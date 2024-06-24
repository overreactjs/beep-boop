import { useUpdate, useTaggedCollision, CollisionBox, Node, useProperty, SpriteSet, BitmapSprite, useMergeProperty } from "@overreact/engine";
import { useCallback, useId } from "react";
import { PlayerZapState } from "../../../state";
import { useParticles } from "../../Particles";
import { ProjectileProps } from "../types";
import { ZAP_FLASH_P1_SPRITE, ZAP_FLASH_P2_SPRITE, ZAP_P1_SPRITE, ZAP_P2_SPRITE } from "./assets";
import { ZapParticle } from "./ZapParticle";

const PARTICLE_COUNT = 50;

export const PlayerZap: React.FC<ProjectileProps<PlayerZapState>> = ({ projectile }) => {
  const particles = useParticles();

  const collider = useId();
  const wallCollider = useId();

  const age = useProperty(0);
  const animation = useMergeProperty(age, projectile.ttl, (age, ttl) => age >= ttl - 50 ? 'flash' : 'solid');
  const active = useMergeProperty(age, projectile.ttl, (age, ttl) => age <= ttl);

  // Create a batch of particles for a projectile.
  const createParticles = useCallback((bounce: boolean) => {
    for (let i = 0; i <= PARTICLE_COUNT; i++) {
      particles.attach(ZapParticle.fromZap(projectile, bounce));
    }
  }, [particles, projectile]);
  
  // Update the position of the projectile each frame, and destroy it when it's too old.
  useUpdate((delta) => {
    projectile.pos.current[0] += delta / 8 * projectile.direction * (projectile.ttl.current / 500);
    age.current += delta;

    if (age.current > projectile.ttl.current + 50) {
      projectile.destroy();
    }
  });

  // Destroy projectiles when they hit walls, but only walls that have left/right collisions enabled.
  useTaggedCollision(wallCollider, 'platform', (collisions) => {
    if (projectile.direction === 1 && collisions.some(({ tags }) => tags.includes('left'))) {
      projectile.destroy();
      createParticles(true);

    } else if (projectile.direction === -1 && collisions.some(({ tags }) => tags.includes('right'))) {
      projectile.destroy();
      createParticles(true);
    }
  });

  // Destroy projectiles when they hit (not stunned) enemies.
  useTaggedCollision(collider, 'enemy', () => {
    projectile.destroy();
    createParticles(false);
  });

  return (
    <Node pos={projectile.pos}>
      <Node offset={[-4, -4]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite name="solid" size={[8, 8]} sprite={[ZAP_P1_SPRITE, ZAP_P2_SPRITE][projectile.player]} repeat={false} />
          <BitmapSprite name="flash" size={[8, 8]} sprite={[ZAP_FLASH_P1_SPRITE, ZAP_FLASH_P2_SPRITE][projectile.player]} />
        </SpriteSet>
      </Node>
      <Node offset={[-4, -4]}>
        <CollisionBox size={[8, 8]} id={collider} tags={['zap']} active={active}/>
      </Node>
      <Node offset={[-2, -2]}>
        <CollisionBox size={[4, 4]} id={wallCollider} active={active}/>
      </Node>
    </Node>
  );
};