import { CollisionBox, Node, usePosition } from "@overreact/engine";
import { LevelPortalData } from "../../types";

type PortalProps = LevelPortalData & {
  id: number;
  level: number;
}

export const Portal: React.FC<PortalProps> = ({ pos, level }) => {
  const teleportPos = usePosition([pos[0], pos[1] + (level - 1) * 200]);

  return (
    <Node pos={teleportPos}>
      <CollisionBox size={[16, 16]} tags={['portal']} />
      <Node offset={[-8, -16]}>
        <CollisionBox size={[32, 8]} tags={['solid']} />
      </Node>
    </Node>
  );
};

// const spritePos = useOffsetPosition(teleportPos, direction === 'left' ? [30, -8] : [-22, -8]);
// <BitmapImage pos={spritePos} size={[8, 24]} offset={[0, 0]} image={PORTAL_IMAGE} />