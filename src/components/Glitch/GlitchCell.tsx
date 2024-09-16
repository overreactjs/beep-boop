import { Node, Position, Property, useProperty, useDynamicProperty, useFixedUpdate, Box, BitmapImage } from "@overreact/engine";
import { GLYPHS_IMAGE } from "./assets";
import { COLORS } from "./constants";

type GlitchCellProps = {
  pos: Position;
  cell: Property<number>;
}

export const GlitchCell: React.FC<GlitchCellProps> = ({ pos, cell }) => {
  // const game = useGame();
  const color = useProperty(COLORS[0]);
  const offset = useProperty<Position>([0, 0]);
  const visible = useDynamicProperty(cell, (cell) => cell > 0);
  
  useFixedUpdate(10, () => {
    if (cell.current > 0) {
      if (Math.random() >= 0.5) {
        color.current = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      if (Math.random() >= 0.3) {
        offset.current = [Math.floor(Math.random() * 32) * 8, Math.floor(Math.random() * 24) * 8];
      }
    }
  });
  
  return (
    <Node pos={pos} visible={visible}>
      <Box size={[8, 8]} color={color} />
      <BitmapImage image={GLYPHS_IMAGE} size={[8, 8]} offset={offset} />
    </Node>
  );
};
