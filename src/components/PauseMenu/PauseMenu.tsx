import { Box, useSync } from "@overreact/engine";
import { useGame } from "../../hooks";
import { Menu, MenuItem } from "../Menu";

type PauseMenuProps = {
  onQuit: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ onQuit }) => {
  const game = useGame();
  const isPaused = useSync(() => game?.paused.current);
  
  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        game.unpause();
        return;
      case 2:
        return onQuit();
    }
  };

  if (!isPaused) {
    return null;
  }

  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Menu onSelect={handleSelect}>
        <MenuItem index={0} pos={[72, 76]} text="CONTINUE GAME" />
        <MenuItem index={1} pos={[96, 92]} text="OPTIONS" />
        <MenuItem index={2} pos={[104, 108]} text="QUIT!" />
      </Menu>
    </Box>
  );
};
