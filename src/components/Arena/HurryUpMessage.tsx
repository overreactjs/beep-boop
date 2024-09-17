import { Box, Node, Position, useDynamicProperty, useFlash, useProperty, useUpdate } from "@overreact/engine";
import { useGame } from "../../hooks";
import { ArcadeText } from "../ArcadeText";

export const HurryUpMessage: React.FC = () => {
  const game = useGame();
  const pos = useProperty<Position>([80, 0]);
  const flash = useFlash(100);
  const color = useDynamicProperty(flash, (flash) => flash ? '#ff0' : '#f00');

  useUpdate((delta) => {
    if (!game.hurryMode.current) {
      pos.current = [80, 200];
    } else {
      pos.current[1] -= delta / 16;
    }
  });

  return (
    <Node pos={pos} rounded>
      <ArcadeText text="HURRY UP!!!" />
      <Box size={[88, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
};