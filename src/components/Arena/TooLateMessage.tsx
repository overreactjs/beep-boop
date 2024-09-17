import { Box, Node, Position, useDynamicProperty, useFlash, useProperty, useUpdate } from "@overreact/engine";
import { useGame } from "../../hooks";
import { ArcadeText } from "../ArcadeText";

export const TooLateMessage: React.FC = () => {
  const game = useGame();
  const pos = useProperty<Position>([80, 0]);
  const flash = useFlash(100);
  const color = useDynamicProperty(flash, (flash) => flash ? '#f00' : '#f0f');

  useUpdate((delta) => {
    if (!game.glitchMode.current) {
      pos.current = [80, 200];
    } else {
      pos.current[1] -= delta / 16;
    }
  });

  return (
    <Node pos={pos} rounded>
      <ArcadeText text="TOO LATE!!!" />
      <Box size={[88, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
};