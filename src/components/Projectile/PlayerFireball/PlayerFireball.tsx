import { useOffsetPosition, usePosition, useUpdate, CollisionBox, Node, BitmapSprite, useProperty } from "@overreact/engine";
import { useId } from "react";
import { PlayerFireballState } from "../../../state";
import { ProjectileProps } from "../types";
import { FIREBALL_SPRITE } from "./assets";

const DESTROY_AGE = 5000;

export const PlayerFireball: React.FC<ProjectileProps<PlayerFireballState>> = ({ projectile }) => {
  const collider = useId();
  const pos = useOffsetPosition(usePosition(projectile.pos), [-8, -8]);
  const age = useProperty(0);

  useUpdate((delta) => {
    projectile.pos.current[0] += delta / 10 * projectile.direction;
    age.current += delta;

    if (age.current > DESTROY_AGE) {
      projectile.destroy();
    }
  });

  return (
    <Node pos={pos}>
      <BitmapSprite size={[16, 16]} sprite={FIREBALL_SPRITE} />
      <CollisionBox size={[16, 16]} id={collider} tags={['playerFireball']} />
    </Node>
  );
};