import { Box, Position, Prop, useDynamicProperty, usePosition } from "@overreact/engine";

type BlockIndicatorProps = {
  pos: Prop<Position>;
}

export const BlockIndicator: React.FC<BlockIndicatorProps> = (props) => {
  const pos = useDynamicProperty(usePosition(props.pos), ([x, y]): Position => [x << 3, y << 3]);

  return <Box pos={pos} size={[8, 8]} color="#0f08" className="border border-solid border-[#0f0]" />;
};
