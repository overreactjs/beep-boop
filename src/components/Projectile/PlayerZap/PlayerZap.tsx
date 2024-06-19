import { useUpdate, useTaggedCollision, CollisionBox, Node, useProperty, SpriteSet, BitmapSprite, useMergeProperty } from "@overreact/engine";
import { useId } from "react";
import { PlayerZapState } from "../../../state";
import { ZAP_FLASH_SPRITE, ZAP_SPRITE } from "./assets";
import { ProjectileProps } from "../types";

export const PlayerZap: React.FC<ProjectileProps<PlayerZapState>> = ({ projectile }) => {
  const collider = useId();
  const wallCollider = useId();

  const age = useProperty(0);
  const animation = useMergeProperty(age, projectile.ttl, (age, ttl) => age >= ttl - 100 ? 'flash' : 'solid');
  const active = useMergeProperty(age, projectile.ttl, (age, ttl) => age <= ttl);
  
  useUpdate((delta) => {
    projectile.pos.current[0] += delta / 8 * projectile.direction * (projectile.ttl.current / 500);
    age.current += delta;

    if (age.current > projectile.ttl.current + 100) {
      projectile.destroy();
    }
  });

  useTaggedCollision(wallCollider, 'platform', (collisions) => {
    if (projectile.direction === 1 && collisions.some(({ tags }) => tags.includes('left'))) {
      projectile.destroy();
    } else if (projectile.direction === -1 && collisions.some(({ tags }) => tags.includes('right'))) {
      projectile.destroy();
    }
  });

  useTaggedCollision(collider, 'enemy', () => {
    projectile.destroy();
  });

  return (
    <Node pos={projectile.pos}>
      <Node offset={[-4, -4]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite name="solid" size={[8, 8]} sprite={ZAP_SPRITE} />
          <BitmapSprite name="flash" size={[8, 8]} sprite={ZAP_FLASH_SPRITE} />
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