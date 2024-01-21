import { useId } from "react";
import { usePosition, useProperty, Velocity, useOffsetPosition, usePlatformMovement, Box, CollisionBox, Node } from "@overreact/engine";
import { useIntegerPosition } from "../hooks";

export const Player = () => {
  const pos = usePosition([32, 192]);
  const velocity = useProperty<Velocity>([0, 0]);
  const collisionPos = useOffsetPosition(pos, [-8, -16]);
  const spritePos = useIntegerPosition(collisionPos);
  const collider = useId();

  usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    speed: 0.08,
    jumpStrength: 0.165,
  });
  
  return (
    <Node pos={pos}>
      <Box pos={spritePos} size={[16, 16]} color="#0f0" />
      <CollisionBox pos={collisionPos} size={[16, 16]} id={collider} />
    </Node>
  );
};