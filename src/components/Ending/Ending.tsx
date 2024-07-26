import { Box, Position, useCachedDynamicProperty } from "@overreact/engine"
import { useGame } from "../../hooks";
import { ArcadeText } from "../ArcadeText";
import { Menu, MenuItem } from "../Menu";

type EndingProps = {
  onEndGame: () => void;
}

export const Ending: React.FC<EndingProps> = ({ onEndGame }) => {
  const game = useGame();
  const pos: Position = [0, game.levels.length * 200];

  const active = useCachedDynamicProperty(game.level, (level) => level > game.levels.length);

  const handleSelect = () => {
    if (game.level.current > game.levels.length) {
      onEndGame();
    }
  };

  return (
    <Box pos={pos} size={[256, 200]} color="black">
      <ArcadeText pos={[24, 80]} color="white" text="YOU HAVE REACHED THE END..." />
      <ArcadeText pos={[88, 96]} color="white" text="...FOR NOW!" />
      <Menu onSelect={handleSelect} active={active}>
        <MenuItem index={0} pos={[48, 128]} text="BACK TO TITLE SCREEN" />
      </Menu>
    </Box>
  );
};
