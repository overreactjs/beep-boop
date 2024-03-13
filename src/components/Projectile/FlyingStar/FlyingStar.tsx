import { useUpdate, CollisionBox, Node, useProperty, BitmapImage } from "@overreact/engine";
import { useId } from "react";
import { FlyingStarState } from "../../../state";
import { ProjectileProps } from "../types";
import { STARS_IMAGE } from "./assets";

const DESTROY_AGE = 5000;

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
      <BitmapImage size={[10, 10]} offset={[0, 0]} image={STARS_IMAGE} />
      <CollisionBox size={[10, 10]} id={collider} tags={['flyingStar']} />
    </Node>
  );
};