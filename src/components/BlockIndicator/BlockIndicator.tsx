import { Box, Position, useDynamicProperty, usePosition } from "@overreact/engine";
import { PositionedObjectState } from "../../state/PositionedObjectState";

type BlockIndicatorProps = {
  entity: PositionedObjectState;
}

export const BlockIndicator: React.FC<BlockIndicatorProps> = ({ entity }) => {
  const pos = useDynamicProperty(usePosition(entity.pos), ([x, y]): Position => {
    return [(x >> 3) << 3, (y >> 3) << 3];
  });

  return <Box pos={pos} size={[8, 8]} color="#0f08" className="border border-solid border-[#0f0]" />;
};
