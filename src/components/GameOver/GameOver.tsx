import { Box } from "@overreact/engine"
import { ArcadeText } from "../ArcadeText";
import { Menu, MenuItem } from "../Menu";
import { Screen } from "../Screen";

type GameOverProps = {
  onBack: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onBack }) => {
  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        <ArcadeText pos={[88, 96]} color="white" text="GAME OVER!" />
        <Menu onSelect={onBack}>
          <MenuItem index={0} pos={[48, 128]} text="BACK TO TITLE SCREEN" />
        </Menu>
      </Box>
    </Screen>
  );
};
