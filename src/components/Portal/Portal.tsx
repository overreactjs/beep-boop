import { useId } from "react";
import { Box, CollisionBox, Node, useOffsetPosition, usePosition } from "@overreact/engine";
import { LevelPortalData } from "../../types";

type PortalProps = LevelPortalData & {
  id: number;
  level: number;
}

export const Portal: React.FC<PortalProps> = ({ pos, level }) => {
  const collider = useId();

  const teleportPos = usePosition([pos[0], pos[1] + (level - 1) * 200]);
  const platformPos = useOffsetPosition(teleportPos, [-8, 16]);

  return (
    <Node>
      <Box size={[16, 16]} pos={teleportPos} color="orange" />
      <CollisionBox id={collider} size={[16, 16]} pos={teleportPos} tags={['portal']} />
      <CollisionBox size={[32, 8]} pos={platformPos} tags={['solid']} />
    </Node>
  );
};
