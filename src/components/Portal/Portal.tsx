import { useId } from "react";
import { BitmapImage, Box, CollisionBox, Node, useOffsetPosition, usePosition } from "@overreact/engine";
import { LevelPortalData } from "../../types";
import { PORTAL_IMAGE } from "./assets";

type PortalProps = LevelPortalData & {
  id: number;
  level: number;
}

export const Portal: React.FC<PortalProps> = ({ pos, level, direction }) => {
  const collider = useId();

  const teleportPos = usePosition([pos[0], pos[1] + (level - 1) * 200]);
  const platformPos = useOffsetPosition(teleportPos, [-8, 16]);
  const spritePos = useOffsetPosition(teleportPos, direction === 'left' ? [30, -8] : [-22, -8]);

  return (
    <Node>
      <BitmapImage pos={spritePos} size={[8, 24]} offset={[0, 0]} image={PORTAL_IMAGE} />
      <CollisionBox id={collider} size={[16, 16]} pos={teleportPos} tags={['portal']} />
      <CollisionBox size={[32, 8]} pos={platformPos} tags={['solid']} />
    </Node>
  );
};
