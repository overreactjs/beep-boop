import { useUpdate, CollisionBox, Node, useProperty, BitmapImage } from "@overreact/engine";
import { useId } from "react";
import { FlyingStarState } from "../../../state";
import { ProjectileProps } from "../types";
import { STARS_IMAGE } from "./assets";
import { FlyingStarColor } from "../../../types";

const DESTROY_AGE = 5000;

const OFFSETS: Record<FlyingStarColor, number> = {
  yellow: 0,
  green: 10,
  cyan: 40,
  magenta: 30,
  red: 20,
}

export const FlyingStar: React.FC<ProjectileProps<FlyingStarState>> = ({ projectile }) => {
  const collider = useId();
  const age = useProperty(0);

  useUpdate((delta) => {
    projectile.pos.current[0] += projectile.velocity.current[0];
    projectile.pos.current[1] += projectile.velocity.current[1];
    age.current += delta;

    if (age.current > DESTROY_AGE) {
      projectile.destroy();
    }
  });

  return (
    <Node pos={projectile.pos} offset={[-5, -5]} rounded>
      <BitmapImage size={[10, 10]} offset={[OFFSETS[projectile.color], 0]} image={STARS_IMAGE} />
      <CollisionBox size={[10, 10]} id={collider} tags={['flyingStar']} />
    </Node>
  );
};