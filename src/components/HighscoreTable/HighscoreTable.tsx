import { Box } from "@overreact/engine";
import { useMemo } from "react";
import { getLeaderboard } from "../../services";
import { Screen } from "../Screen";
import { Leaderboard } from "./Leaderboard";
import { Menu, MenuItem } from "../Menu";

type HighscoreTableProps = {
  onBack: () => void;
}

export const HighscoreTable: React.FC<HighscoreTableProps> = ({ onBack }) => {
  const leaderboard = useMemo(() => getLeaderboard(), []);

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="#000">
        <Menu onSelect={onBack} onBack={onBack}>
          <MenuItem index={0} pos={[48, 24]} text="BACK TO TITLE SCREEN" />
        </Menu>
        <Leaderboard pos={[0, 48]} scores={leaderboard} />
      </Box>
    </Screen>
  );
};
