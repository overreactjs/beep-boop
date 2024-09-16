import { Box, Position, useDynamicProperty } from "@overreact/engine";
import { useGame } from "../../hooks";
import { GlitchCell } from "./GlitchCell";

export const Glitch: React.FC = () => {
  const game = useGame();
  const pos = useDynamicProperty(game.level, (level): Position => [0, (level - 1) * 200]);

  return (
    <Box pos={pos} size={[320, 200]}>
      {game.glitch.cells.map((cell, index) => {
        const pos: Position = [index % 32 * 8, Math.floor(index / 32) * 8];
        return <GlitchCell key={index} pos={pos} cell={cell} />;
      })}
    </Box>
  );
};
