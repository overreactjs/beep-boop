import { useUpdate, useTaggedCollision, CollisionBox, Node, useProperty, SpriteSet, useDynamicProperty, BitmapSprite } from "@overreact/engine";
import { useId } from "react";
import { PlayerZapState } from "../../../state";
import { ZAP_FLASH_SPRITE, ZAP_SPRITE } from "./assets";
import { ProjectileProps } from "../types";

const FLASH_AGE = 400;
const COLLISION_AGE = 500;
const DESTROY_AGE = 600;

export const PlayerZap: React.FC<ProjectileProps<PlayerZapState>> = ({ projectile }) => {
  const collider = useId();
  const wallCollider = useId();

  const age = useProperty(0);
  const animation = useDynamicProperty(age, (age) => age >= FLASH_AGE ? 'flash' : 'solid');
  const active = useDynamicProperty(age, (age) => age <= COLLISION_AGE);

  useUpdate((delta) => {
    projectile.pos.current[0] += delta / 8 * projectile.direction;
    age.current += delta;

    if (age.current > DESTROY_AGE) {
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